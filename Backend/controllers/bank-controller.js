const bank_MSG = {
	wrongWithdrawAmount: "Invalid amount specified to withdraw",
	insufficientFund: "Insufficient funds to make this withdrawal",
	invalidInput: "Invalid Data Provided",
	invalidUser: "User does not exist for the account number :- ",
	invalidWithdrawAmount: "Sorry, deposit amount cannot be 0 or less than 0",
};

const withdraw = async function(req, res, next) {
    try {
        const { withdrawAmount } = req.body;
        if (!withdrawAmount) {
            res.status(400).json({
            reason: "wrongAmount",
            message: bank_MSG.wrongWithdrawAmount,
            success: false
        });
        }

        let currentUser = await User.findById(req.user.user_id);

        if (withdrawAmount > currentUser.accountBalance) {
            res.status(400).json({
                reason: "insufficientFund",
                message: bank_MSG.insufficientFund,
                success: false
            });
        }
        currentUser.accountBalance = currentUser.accountBalance - withdrawAmount;

        const transactionDetails = {
            transactionType: 'Withdraw',
            accountNumber: currentUser.accountNumber,
            description: `Withdrawal of ${withdrawAmount}`,
            //sender: currentUser.accountNumber,
            transactionAmount: withdrawAmount
        };
        await currentUser.save();
        await Transaction.create(transactionDetails);
        res.status(200).json(`Withdrawal of ${withdrawAmount} was successful`);
    } catch (e) {
        res.json({ message: e });
    }
}

const getBalance = function(req, res, next) {
    User.findById(req.params.Id, function(err, user) {
        if (err)
            res.status(404).send(`User with Id ${Id} does not exist in the database`);
        res.json(`The account balance of ${user.fullName} is ${user.accountBalance}`);
    });
};

const transactionHistory = function(req, res, next) {
    Transaction.find({ accountNumber: req.params.accountNumber }, function(err, transaction) {
        if (err)
            res.status(404).send(`User with account number ${accountNumber} does not exist`);
        res.json(transaction);
    });
};


const deposit = async function(req, res, next) {
    try {

        const { accountNumber, depositAmount, description, from } = req.body;
        if (!(accountNumber && depositAmount && description && from)) {
            res.status(400).json({
                reason: "invalidInput",
                message: bank_MSG.invalidInput,
                success: false
            });
        }

        let user = await User.findOne({ accountNumber });

        if (user === null) {
                res.status(400).json({
                reason: "noUser",
                message: bank_MSG.invalidUser + accountNumber,
                success: false
            });
        }
        if (depositAmount <= 0) {
            res.status(400).json({
                reason: "noUser",
                message: bank_MSG.invalidUser + accountNumber,
                success: false
            });
        }
        if (depositAmount > 0) {
            user.accountBalance = user.accountBalance + depositAmount;
            let transactionDetails = {
                transactionType: 'Deposit',
                accountNumber: accountNumber,
                description: description,
                sender: from,
                transactionAmount: depositAmount
            };
            await user.save();
            await Transaction.create(transactionDetails)
            res.status(201).json({
                reason: "success",
                message: "Deposit of " + depositAmount + " to " + accountNumber +" was successful.",
                success: false
            });
        }

    } catch (err) {
        return res.json({ message: err });
    }
}

const transfer = async function(req, res, next) {
    try {
        const { accountNumber, transferAmount, description } = req.body;
        if (!(accountNumber && transferAmount && description)) {
            res.status(400).json({
                reason: "invalidInput",
                message: bank_MSG.invalidInput,
                success: false
            });
        }

        let beneficiary = await User.findOne({ accountNumber });
        if (beneficiary === null) {
            res.status(400).json({
                reason: "noUser",
                message: bank_MSG.invalidUser + accountNumber,
                success: false
            });
        }

        let currentUser = await User.findById(req.user.user_id);

        if (transferAmount > currentUser.accountBalance && transferAmount > 0) {
                res.status(400).json({
                reason: "insufficientFund",
                message: bank_MSG.insufficientFund,
                success: false
            });
        }
        if (currentUser.accountNumber === beneficiary) {
            res.status(400).json({
                reason: "selfTransferFund",
                message: "You can not transfer fund to yourself",
                success: false
            });
        }

        if (currentUser.accountNumber !== beneficiary) {
            beneficiary.accountBalance = beneficiary.accountBalance + transferAmount;
            currentUser.accountBalance = currentUser.accountBalance - transferAmount;
            let transactionDetails = {
                transactionType: 'Transfer',
                accountNumber: accountNumber,
                description: description,
                sender: currentUser.accountNumber,
                transactionAmount: transferAmount
            };
            await beneficiary.save();
            await currentUser.save();
            await Transaction.create(transactionDetails);

            res.status(200).json({
                reason: "success",
                message: "Transfer of " + transferAmount + " to " + accountNumber +" was successful.",
                success: false
            });
        }
    } catch (err) {
        res.json({ message: err });
    }
}

module.exports = {
    transactionHistory,
    transfer,
    deposit,
    getBalance,
    withdraw
}