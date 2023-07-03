const { Schema, model } = require("mongoose");

const bankAccTransactionsSchema = new Schema(
	{
		
	},
	{ timestamps: true }
);

module.exports = model("bankAccTransactions", bankAccTransactionsSchema);
