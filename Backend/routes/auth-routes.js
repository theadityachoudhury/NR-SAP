const express = require("express");
const Role = require("../models/roles");
const {
	login,
	register,
	verify,
	generate,
	verifytoken,
	logout,
	verifyRefreshToken,
	refresh,
	getuser,
} = require("../controllers/Auth/auth-controller");
const {
	checkloggedin,
	verification,
	isOTP,
} = require("../controllers/Validators/Auth/validators");
const {
	roleValidator,
} = require("../controllers/Validators/Auth/role-validators");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verifytoken, verification, isOTP, verify, logout);
router.get("/user", verifytoken, getuser);
router.get("/refresh", verifyRefreshToken, refresh);
router.post("/logout", verifytoken, logout);
router.post(
	"/test",
	verifytoken,
	(req, res, next) => roleValidator("test", req, res, next),
	verify
);

module.exports = router;
