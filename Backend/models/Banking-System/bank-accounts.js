const { Schema, model } = require("mongoose");

const bankAccSchema = new Schema(
	{
		accountNumber: {
			type: String,
			required: true,
			unique: true,
		},
		accountType: {
			type: String,
			required: true,
		},
		balance: {
			type: Number,
			required: true,
			default: 0,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "bankAccHolder",
			required: true,
		},
		cards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "bankAccCards",
			},
		],
		isActive: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("bankAcc", bankAccSchema);
