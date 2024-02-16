const express = require('express')
const router = express.Router()

const { createIncome } = require('../controllers/incomeController')
const protect = require('../middleware/authentication')

router.post('/', protect, createIncome)

module.exports = router
