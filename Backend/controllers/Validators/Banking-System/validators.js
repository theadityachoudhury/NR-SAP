const Joi = require("joi");
const bankAcc = require('../../../models/Banking-System/bank-accounts');

const bankAccSchema = Joi.object({
	accountNumber: Joi.string().required(),
	accountType: Joi.string().required(),
	balance: Joi.number().required().default(0),
	owner: Joi.string().required(), // Assuming the owner is referenced by their ID
	cards: Joi.array().items(Joi.string()), // Assuming the cards are referenced by their IDs
	isActive: Joi.boolean().default(true),
});

const validateAccount = async ({ accountNumber }) => {
    const acc = bankAcc.find({ accountNumber });
    if (acc) {
        return true;
    }
    return false; 
};

module.exports = {
	bankAccSchema,
	validateAccount,
};
