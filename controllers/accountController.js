const asyncHandler = require("express-async-handler");

const Account = require("../models/Account");

// @desc setup account
// @route POST /api/accounts
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

// @desc get accounts
// @route GET /api/accounts
// @access PRIVATE

const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({ user: req.user.id });
  res.status(200).json(accounts);
});

// @desc update account
// @route PUT /api/accounts/:id
// @access PRIVATE

const updateAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    res.status(400);
    throw new Error("Account not found");
  }

  // patikrinam ir useri

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // tikrinam ar prisijunges useris atitinka saskaitos savininka

  if (account.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (req.user.role === "admin" || account.user.toString() === req.user.id) {
    // response turi grazinti atnaujinta saskaita
    const updateAccount = await Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json(updateAccount);
  }
});

// @desc delete account
// @route DELETE /api/accounts/:id
// @access PRIVATE

const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    res.status(400);
    throw new Error("account not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (account.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Account.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = { setupAccount, getAccounts, updateAccount, deleteAccount };
