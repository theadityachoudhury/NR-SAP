const express = require("express");
const {
	login,
	register,
	verify,
	generate,
	verifytoken,
    logout,
} = require("../controllers/Auth/auth-controller");
const { checkloggedin, verification, isOTP } = require("../controllers/Validators/Auth/validators");

const router = express.Router();

router.post("/login", checkloggedin, login);
router.post("/register", register);
router.post("/verify", verifytoken, verification, isOTP, verify,logout);
router.post("/generate", verifytoken, verification, generate);
router.post("/logout", logout);

module.exports = router;
