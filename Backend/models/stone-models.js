const { Schema, model } = require("mongoose");

const StoneSchema = new Schema(
	{
        companyName: {
            type: String,
            required: true,
        },
        totalWeight: {
            type: Number,
            required: true,
        }
	},
	{ timestamps: true }
);

module.exports = model("Stone", StoneSchema);