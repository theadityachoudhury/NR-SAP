const User = require("../models/Users");
const Auth = require("../models/auths");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {
	loginSchema,
	signupSchema,
	validateUsername,
	validateEmail,
} = require("../controllers/validators");
const { JWT_SECRET } = require("../config/db");

const Login_MSG = {
	usernameNotExist: "Username is not found. Invalid login credentials.",
	wrongRole: "Please make sure this is your identity.",
	loginSuccess: "You are successfully logged in.",
	wrongPassword: "Incorrect password.",
	loginError: "Oops! Something went wrong.",
};

const Register_MSG = {
	usernameExists: "Username is already taken.",
	emailExists: "Email is already registered.",
	signupSuccess: "You are successfully signed up.",
	signupError: "Unable to create your account.",
};

const otpgen = (length) => {
	const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	const digits = "0123456789";
	let otp = "";

	let alphabetCount = 0;
	let hasMinimumOneAlphabet = false;

	for (let i = 0; i < length; i++) {
		let randomIndex;

		if (
			(alphabetCount < 2 && Math.random() < 0.5) ||
			(i === length - 1 && !hasMinimumOneAlphabet)
		) {
			// If the current count of alphabets is less than 2 and random condition is met,
			// or if it is the last character and there has not been minimum one alphabet yet,
			// ensure the character is an alphabet.
			randomIndex = Math.floor(Math.random() * alphabets.length);
			otp += alphabets[randomIndex];
			alphabetCount++;
			hasMinimumOneAlphabet = true;
		} else {
			// Otherwise, add a random digit.
			randomIndex = Math.floor(Math.random() * digits.length);
			otp += digits[randomIndex];
		}
	}

	return otp;
};

const passgen = (length) => {
	const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const specialCharacters = "!@#$%^&*()_";

	const getRandomChar = (characters) => {
		const randomIndex = Math.floor(Math.random() * characters.length);
		return characters[randomIndex];
	};

	let password = "";

	// Generate one random character from each category
	password += getRandomChar(uppercaseLetters);
	password += getRandomChar(lowercaseLetters);
	password += getRandomChar(numbers);
	password += getRandomChar(specialCharacters);

	// Generate remaining characters randomly
	const remainingLength = length - password.length;
	const allCharacters =
		uppercaseLetters + lowercaseLetters + numbers + specialCharacters;

	for (let i = 0; i < remainingLength; i++) {
		password += getRandomChar(allCharacters);
	}

	// Shuffle the password to randomize the order of characters
	password = password
		.split("")
		.sort(() => 0.5 - Math.random())
		.join("");
	return password;
};

const verifyUser = async (username,verified) => {
	let user = await User.findOne({ username });
	user.verified = verified;
	await user.save();
}

const login = async (req, res, next) => {
	try {
		const LoginRequest = await loginSchema.validateAsync(req.body);
		let { username, password } = req.body;
		let user;
		if (username) {
			user = await User.findOne({ username });
		}

		if (!user) {
			return res.status(404).json({
				reason: "username",
				message: Login_MSG.usernameNotExist,
				success: false,
			});
		}

		if (user.deleted) {
			return res.status(404).json({
				reason: "username",
				message: Login_MSG.usernameNotExist,
				success: false,
			});
		}

		let isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			let token = jwt.sign(
				{
					user_id: user._id,
					role: user.role,
					username: user.username,
					email: user.email,
					verified: user.verified,
				},
				JWT_SECRET,
				{ expiresIn: "1 days" }
			);

			let result = {
				username: user.username,
				role: user.role,
				email: user.email,
				token: token,
				expiresIn: "1 days",
			};

			res.cookie(String(user._id), token, {
				path: "/",
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
				httpOnly: true,
				sameSite: "lax",
			});

			return res.status(200).json({
				...result,
				message: Login_MSG.loginSuccess,
				success: true,
			});
		} else {
			return res.status(200).json({
				reason: "password",
				message: Login_MSG.wrongPassword,
				success: false,
			});
		}
	} catch (err) {
		let errorMsg = Login_MSG.loginError;
		if (err.isJoi === true) {
			err.status = 403;
			errorMsg = err.message;
		}
		return res.status(500).json({
			reason: "server",
			message: errorMsg,
			success: false,
		});
	}
};

const register = async (req, res, next) => {
	try {
		const role = req.body.role;
		const signupRequest = await signupSchema.validateAsync(req.body);

		let usernameNotTaken = await validateUsername(signupRequest.username);
		if (!usernameNotTaken) {
			return res.status(400).json({
				message: Register_MSG.usernameExists,
				success: false,
			});
		}

		let emailNotRegistered = await validateEmail(signupRequest.email);
		if (!emailNotRegistered) {
			return res.status(400).json({
				message: Register_MSG.emailExists,
				success: false,
			});
		}
		let pass = passgen(12);
		const password = await bcrypt.hash(pass, 12);
		const newUser = new User({
			...signupRequest,
			password,
			role,
		});

		await newUser.save();
		return res.status(201).json({
			password: pass,
			message: Register_MSG.signupSuccess,
			success: true,
		});
	} catch (err) {
		let errorMsg = Register_MSG.signupError;
		if (err.isJoi === true) {
			err.status = 403;
			errorMsg = err.message;
		}
		console.log(err);
		return res.status(err.status).json({
			message: errorMsg,
			success: false,
		});
	}
};

const verifytoken = (req, res, next) => {
	if (req.headers.cookie) {
		const cookies = req.headers.cookie;
		try {
			token = cookies.split("=")[1];
		} catch (err) {
			console.log(err);
		}
	} else {
		return res.status(200).json({
			reason: "unauthorized",
			message: "Session not found",
			success: false,
		});
	}

	if (!token) {
		return res.status(200).json({
			reason: "unauthorized",
			message: "token not found",
			success: false,
		});
	}

	jwt.verify(String(token), JWT_SECRET, (err, user) => {
		if (err) {
			return res
				.status(400)
				.json({
					reason: "unauthorized",
					message: "Invalid token",
					success: false,
				});
		} else {
			req._id = user.user_id;
			req.body.username = user.username;
			req.token = token;
			req.email = user.email;
			req.verified = user.verified;
			next();
		}
	});
};

const refreshtoken = (req, res, next) => { };


const generate = async (req, res, next) => {
	
	const otp_len = 6;
	const auth_type = "acc_verify"
	let otp;
	const email = req.email;
	const username = req.body.username;

	let auth = await Auth.findOne({ username, auth_type:auth_type });
	if (auth) {
		otp = auth.otp
	}
	else {
		otp = otpgen(otp_len);
		auth = new Auth({
			email,
			username,
			auth_type,
			otp,
		})

		try {
			await auth.save();
		} catch (err) {
			return res.status(500).json({
				reason: "error",
				message: "Internal Server Error! Cannot generate OTP!",
				success: false,
			});
		}
	}

	return res.status(200).json({
		otp:otp,
		message: "OTP generated successfully and sent to registered E-Mail",
		success: true,
	});
};

const verify = async (req, res, next) => {
	const auth_type = "acc_verify";
	const { username, otp } = req.body;
	if (validateUsername(username)) {
		let auth = await Auth.findOne({ username, auth_type: auth_type });
		if (auth) {
			if (auth.otp === otp) {
				verifyUser(username, true);
				await Auth.findByIdAndDelete(auth._id);
				console.log(req._id);
				res.clearCookie(req._id);
				return res.status(200).json({
					message: "Account verified successfully",
					success: true,
				});

			}
			else {
				return res.status(200).json({
					reason:"otp",
					message: "OTP is wrong",
					success: false,
				});
			}
		} else {
			return res.status(200).json({
				reason:"otp",
				message: "First generate otp then try verifying the account!",
				success: false,
			});
		}
	}
};


const logout = (req, res, next) => {
	const cookies = req.headers.cookie;
	try {
		const prevToken = cookies.split("=")[1];
		if (!prevToken) {
			return res.status(200).json({
				reason: "unauthorized",
				message: "token not found",
				success: false,
			});
		}
		jwt.verify(String(prevToken), JWT_SECRET, (err, user) => {
			if (err) {
				console.log(err);
				return res.status(200).json({
					reason: "unauthorized",
					message: "Authentication failed",
					success: false,
				});
			}
			res.clearCookie(user.user_id);
		});
		
		
	}
	catch (err) {
		return res.status(200).json({
			reason: "loggedout",
			message: "Cookie not found already logged out",
			success: false,
		});
	}
	
	
	return res.status(200).json({
		message: "Successfully Logged Out",
		success: true,
	});
};

module.exports = {
	login,
	register,
	verify,
	generate,
	verifytoken,
	refreshtoken,
	logout,
};
