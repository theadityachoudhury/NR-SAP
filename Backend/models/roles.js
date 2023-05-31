const { Schema, model } = require("mongoose");

const RoleSchema = new Schema(
	{
        endpoint: {                    
			type: String,
			required: true,
        },
        access: {                    
			type: [String],
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("Role", RoleSchema);