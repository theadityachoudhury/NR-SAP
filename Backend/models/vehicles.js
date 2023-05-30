const { Schema, model } = require("mongoose");

const vehicleSchema = new Schema(
	{
		number: {
			type: String,
			required: true,
		},
		owner_name: {
			type: String,
			required: true,
		},
		purchase_date: {
			type: Date,
			required: true,
		},
		cost: {
			type: Number,
			required: True,
		},
	},
	{ timestamps: true }
);

module.exports = model("Vehicles", vehicleSchema);
