const { Schema, model } = require("mongoose");

const bankAccCardsSchema = new Schema(
	{
		cardNumber: {
			type: String,
			required: true,
			unique: true,
		},
		account: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Account",
			required: true,
		},
		cardType: {
			type: String,
			required: true,
		},
		expirationDate: {
			type: Date,
			required: true,
		},
		cvv: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("bankAccCards", bankAccCardsSchema);
