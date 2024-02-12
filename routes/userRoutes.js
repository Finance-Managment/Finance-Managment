const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");

// ! not needed yet
// const protect = require("../middleware/authentication");
// const protectAdmin = require("../middleware/adminAuthentication");

router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;
