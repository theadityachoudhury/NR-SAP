const Joi = require("joi");
const User = require("../models/Users");

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
	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{3,30}$"))
		.min(8)
        .required(),
    role:Joi.string().required(),
});

module.exports = { validateEmail, validateUsername, loginSchema, signupSchema };
