const User = require("../../models/Users");
const Auth = require("../../models/auths");
const RefreshToken = require("../../models/refreshToken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {
	loginSchema,
	signupSchema,
	validateUsername,
	validateEmail,
} = require("../Validators/Auth/validators");
const { JWT_SECRET, JWT_REFRESH_TOKEN_SECRET } = require("../../config/db");

const Login_MSG = {
	usernameNotExist: "Username is not found. Invalid login credentials.",
	wrongRole: "Please make sure this is your identity.",
	loginSuccess: "You are successfully logged in.",
	wrongPassword: "Incorrect password.",
	loginError: "Oops! Something went wrong.",
};
("");
const Register_MSG = {
	usernameExists: "Username is already taken.",
	emailExists: "Email is already registered.",
	signupSuccess: "You are successfully signed up.",
	signupError: "Unable to create your account.",
};

//OTP Generator
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

//Automatic Password Generator
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

//Internal function to verify a user
const verifyUser = async (username, verified) => {
	let user = await User.findOne({ username });
	user.verified = verified;
	await user.save();
};

//Public API functions starts here
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

const login = async (req, res, next) => {
	try {
		const LoginRequest = await loginSchema.validateAsync(req.body);
		let { username, password } = req.body;
		let user;
		let refreshTokenColl;
		if (username) {
			user = await User.findOne({ username });
			refreshTokenColl = await RefreshToken.findOne({ username });
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
				{ expiresIn: "10m" }
			);

			let refreshToken = jwt.sign(
				{
					user_id: user._id,
					role: user.role,
					username: user.username,
					email: user.email,
					verified: user.verified,
				},
				JWT_REFRESH_TOKEN_SECRET
			);

			if (!refreshTokenColl) {
				const newRefreshTokenColl = new RefreshToken({
					username,
					refreshToken,
				});
				newRefreshTokenColl.save();
			}

			if (refreshTokenColl) {
				RefreshToken.updateOne(
					{ username: user.username },
					{ $push: { refreshToken: refreshToken } }
				)
					.then((result) => {
						// console.log('Successfully updated the refresh token');
					})
					.catch((err) => {
						return res.status(406).json({
							reason: "username",
							message: "Unable to generate refresh token",
							success: false,
						});
						console.error(err);
					});
			}

			res.cookie("token", token);
			res.cookie("refreshToken", refreshToken);

			let result = {
				token: token,
				refreshToken: refreshToken,
			};

			return res.status(200).json({
				...result,
				data: user,
				message: Login_MSG.loginSuccess,
				success: true,
			});
		} else {
			return res.status(401).json({
				reason: "password",
				message: Login_MSG.wrongPassword,
				success: false,
			});
		}
	} catch (err) {
		console.log(err);
		let errorMsg = Login_MSG.loginError;
		if (err.isJoi === true) {
			err.status = 403;
			errorMsg = err.message;
		}
		return res.status(err.status).json({
			reason: "server",
			message: errorMsg,
			success: false,
		});
	}
};

const getuser = async (req, res, next) => {
	let user;
	if (req._id) {
		const userid = req._id;
		try {
			user = await User.findById(userid, "-password");
		} catch (err) {
			return new Error(err);
		}
	} else if (req.email) {
		const email = req.body.email;
		try {
			user = await User.findOne({ email: email });
		} catch (err) {
			return new Error(err);
		}
	}
	if (!user) {
		return res.status(200).json(null);
	}
	let r;
	if (req.token) {
		let token = req.token;
		r = {
			token,
			user,
		};
	} else {
		r = user;
	}
	return res.status(200).json({data:user});
};

// const verifytoken = (req, res, next) => {
// 	if (req.headers.cookie) {
// 		const cookies = req.headers.cookie;
// 		try {
// 			token = cookies.split("=")[1];
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	} else {
// 		return res.status(200).json({
// 			reason: "unauthorized",
// 			message: "Session not found",
// 			success: false,
// 		});
// 	}

// 	if (!token) {
// 		return res.status(200).json({
// 			reason: "unauthorized",
// 			message: "token not found",
// 			success: false,
// 		});
// 	}

// 	jwt.verify(String(token), JWT_SECRET, (err, user) => {
// 		if (err) {
// 			return res
// 				.status(400)
// 				.json({
// 					reason: "unauthorized",
// 					message: "Invalid token",
// 					success: false,
// 				});
// 		} else {
// 			req._id = user.user_id;
// 			req.body.username = user.username;
// 			req.token = token;
// 			req.email = user.email;
// 			req.body.role = user.role;
// 			req.verified = user.verified;
// 			next();
// 		}
// 	});
// };

const verifytoken = (req, res, next) => {
	const { token, refreshToken } = req.cookies;

	if (!token) {
		return res.status(200).json(null);
	}

	jwt.verify(String(token), JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(200).json(null);
		} else {
			req._id = user.user_id;
			req.body.username = user.username;
			req.token = token;
			req.email = user.email;
			req.body.role = user.role;
			req.verified = user.verified;
			next();
		}
	});
};

const generate = async (req, res, next) => {
	const otp_len = 6;
	const auth_type = "acc_verify";
	let otp;
	const email = req.email;
	const username = req.body.username;

	let auth = await Auth.findOne({ username, auth_type: auth_type });
	if (auth) {
		otp = auth.otp;
	} else {
		otp = otpgen(otp_len);
		auth = new Auth({
			email,
			username,
			auth_type,
			otp,
		});

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
		otp: otp,
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
				// console.log(req._id);
				res.clearCookie(req._id);
				return res.status(200).json({
					message: "Account verified successfully",
					success: true,
				});
			} else {
				return res.status(401).json({
					reason: "otp",
					message: "OTP is wrong",
					success: false,
				});
			}
		} else {
			return res.status(403).json({
				reason: "otp",
				message: "First generate otp then try verifying the account!",
				success: false,
			});
		}
	}
};

// const logout = (req, res, next) => {
// 	const cookies = req.headers.cookie;
// 	try {
// 		const prevToken = cookies.split("=")[1];
// 		if (!prevToken) {
// 			return res.status(401).json({
// 				reason: "unauthorized",
// 				message: "token not found",
// 				success: false,
// 			});
// 		}
// 		jwt.verify(String(prevToken), JWT_SECRET, (err, user) => {
// 			if (err) {
// 				console.log(err);
// 				return res.status(401).json({
// 					reason: "unauthorized",
// 					message: "Authentication failed",
// 					success: false,
// 				});
// 			}
// 			res.clearCookie(user.user_id);
// 		});

// 	}
// 	catch (err) {
// 		return res.status(200).json({
// 			reason: "loggedout",
// 			message: "Cookie not found already logged out",
// 			success: false,
// 		});
// 	}

// 	return res.status(200).json({
// 		message: "Successfully Logged Out",
// 		success: true,
// 	});
// };

const logout = async (req, res, next) => {
	const { refreshToken } = req.cookies;
	const token = refreshToken;

	res.clearCookie('token');
	res.clearCookie('refreshToken');

	if (!token) {
		return res.status(200).json(null);
	}

	// if (!token) {
	// 	return res.status(200).json({
	// 		reason: "unauthorized",
	// 		message: "token not found",
	// 		success: false,
	// 	});
	// }

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(200).json(null);
		} else {
			
			RefreshToken.findOne({ refreshToken: refreshToken })
				.then((foundToken) => {
					// console.log(foundToken);
					if (!foundToken) {
						throw new Error("Invalid refreshToken");
					}

					// console.log("the email is :- " + user.username);

					return RefreshToken.updateOne(
						{ username: user.username },
						{ $pull: { refreshToken: refreshToken } }
					);
				})
				.then((result) => {
					if (result.nModified === 0) {
						throw new Error("Failed to remove refreshToken");
					}

					// console.log("Successfully removed the refreshToken from the array");
					return res.status(200).json(null);
				})
				.catch((err) => {
					console.error(err.message);
					return res.status(200).json(null);
				});
		}
	});
};

const refresh = async (req, res, next) => {
	let refreshTokenColl;
	var username = req.username;
	// console.log(username);
	refreshTokenColl = await RefreshToken.findOne({ username });

	if (!refreshTokenColl) {
		return res.status(200).json(null);
	} else {
		let token = jwt.sign(
			{
				user_id: req._id,
				username: req.username,
				email: req.email,
				role: req.role,
				verified: req.verified,
			},
			JWT_SECRET,
			{ expiresIn: "10m" }
		);
		res.cookie("token", token);
		return res.status(200).json({
			token,
			message: Login_MSG.loginSuccess,
			success: true,
		});
	}
};

const verifyRefreshToken = async (req, res, next) => {
	const { refreshToken } = req.cookies;
	const token = refreshToken;

	if (!token) {
		return res.status(200).json(null);
	}

	// console.log(token);

	jwt.verify(String(token), JWT_REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			console.log(err);
			return res.status(200).json(null);
		} else {
			req._id = user.user_id;
			req.username = user.username;
			req.email = user.email;
			req.role = user.role;
			req.verified = user.verified;
			next();
		}
	});
};

module.exports = {
	login,
	register,
	verify,
	generate,
	verifytoken,
	logout,
	verifyRefreshToken,
	refresh,
	getuser,
};
