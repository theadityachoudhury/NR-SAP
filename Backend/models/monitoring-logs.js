const { Schema, model } = require("mongoose");

const MonSchema = new Schema(
	{
        system_stat: {                    
			type: String,
			required: true,
        },
        mail_stat: {                    
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("MOn", MonSchema);