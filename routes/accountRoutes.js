const express = require("express");
const router = express.Router();

const setupAccount = require("../controllers/accountController");
const protect = require("../middleware/authentication");

router.route("/").post(protect, setupAccount);

module.exports = router;
