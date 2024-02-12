const asyncHandler = require("express-async-handler");

const Account = require("../models/Account");

// @desc setup account
// @route POST /api/ads
// @access PRIVATE

const setupAccount = asyncHandler(async (req, res) => {
  if (!req.body.accountNumber || !req.body.balance || !req.body.status) {
    res.status(400);
    throw new Error("Please all all required fields");
  }

  const account = await Account.create({
    user: req.user.id,
    accountNumber: req.body.accountNumber,
    balance: req.body.balance,
    status: req.user.status,
  });
  res.status(200).json(account);
});

module.exports = setupAccount;
