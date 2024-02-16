const express = require('express')
const router = express.Router()

const { createOutcome } = require('../controllers/outcomeController')
const protect = require('../middleware/authentication')

router.post('/', protect, createOutcome)

module.exports = router
