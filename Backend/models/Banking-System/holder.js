const { Schema, model } = require("mongoose");

const bankAccHolderSchema = new Schema(
	{
		
	},
	{ timestamps: true }
);

module.exports = model("bankAccHolder", bankAccHolderSchema);
