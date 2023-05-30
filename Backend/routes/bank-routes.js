const express = require("express");
const { verifytoken } = require("../controllers/auth-controller");
const {transactionHistory, transfer, deposit, getBalance, withdraw} = require("../controllers/bank-controller");

const router = express.Router();

router.post("/transfer", verifytoken, transfer);
router.post("/withdraw", verifytoken, withdraw);
router.post("/deposit", verifytoken, deposit)
router.get("/transaction", verifytoken, transactionHistory);
router.get("/balance",  verifytoken, getBalance);

module.exports = router;
