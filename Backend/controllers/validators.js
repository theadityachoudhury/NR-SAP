const Joi = require("joi");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/db");

const validateEmail = async (email) => {
	let user = await User.findOne({ email });
	return user ? false : true;
};

const validateUsername = async (username) => {
	let user = await User.findOne({ username });
	return user ? false : true;
};

const loginSchema = Joi.object({
	username: Joi.string().min(4).required(),
	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{3,30}$"))
		.min(8)
		.required(),
});

const signupSchema = Joi.object({
	name: Joi.string().min(2).required(),
	username: Joi.string().min(4).required(),
	email: Joi.string().email().required(),
	role: Joi.string().required(),
});

const checkloggedin = (req, res, next) => {
	if (req.headers.cookie) {
		const cookies = req.headers.cookie;
		try {
			const token = cookies.split("=")[1];
			if (!token) {
				next();
			} else {
				jwt.verify(String(token), JWT_SECRET, (err, user) => {
					if (err) {
						next();
					} else {
						return res.status(200).json({
							reason: "loggedin",
							message: "Already logged in",
							success: false,
						});
					}
				});
			}
		} catch (err) {
			console.log(err);
		}
	} else {
		next();
	}

	
};

const verification = (req, res, next) => {
	if (req.verified) {
		return res.status(200).json({
			reason: "verified",
			message: "user already verified",
			success: false,
		});
	}
	else {
		next();
	}
}

const isOTP = (req, res, next) => {
	if (req.body.otp) {
		next();
	} else {
		return res.status(200).json({
			reason: "no-OTP",
			message: "no OTP was provided! Enter otp and try again!",
			success: false,
		});
	}
};

module.exports = {
	validateEmail,
	validateUsername,
	loginSchema,
	signupSchema,
	checkloggedin,
	verification,
	isOTP,
};
