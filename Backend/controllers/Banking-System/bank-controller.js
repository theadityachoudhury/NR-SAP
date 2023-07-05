const bankAcc = require("../../models/Banking-System/bank-accounts");
const { validateAccount } = require("../Validators/Banking-System/validators");

const addAccount = async (req, res, next) => {
	const addAccRequest = await bankAccSchema.validateSync(req.body);
	if (validateAccount(req.body)) {
		return res.status(409).json({
			reason: "AccNo.",
			message: "Account Number already exists!",
		});
    }
    
    const acc = new bankAcc({
        ...addAccRequest,
    });
    await acc.save();
    return res.json();
};

const listAccount = async (req, res, next) => {};

const getAccount = async (req, res, next) => {};

const getAccountDetails = async (req, res, next) => {};

const delAccount = async (req, res, next) => {};

const updateAccount = async (req, res, next) => {};

const withdraw = async (req, res, next) => {};

const deposit = async (req, res, next) => {};

const addCards = async (req, res, next) => {};

module.exports = {};
