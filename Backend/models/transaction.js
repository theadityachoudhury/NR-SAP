const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    transactionType: { type: String, enum: ['Deposit', 'Withdraw', 'Transfer'] },
    accountNumber: { type: Number },
    sender: { type: String },
    description: { type: String },
    transactionAmount: { type: Number, },
    transactionTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("transaction", transactionSchema);