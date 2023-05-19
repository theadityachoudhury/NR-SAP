const express = require("express");
const {
	login,
	register,
	verify,
	generate,
	verifytoken,
    logout,
} = require("../controllers/auth-controller");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verifytoken, verify);
router.post("/generate", verifytoken, generate);
router.post("/logout", logout);

module.exports = router;
