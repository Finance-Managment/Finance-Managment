const express = require('express')
const router = express.Router()

const {
    createOutcome,
    getOutcome,
    getOutcomes,
    getAllOutcomes,
} = require('../controllers/outcomeController')
const protect = require('../middleware/authentication')
const protectAdmin = require('../middleware/adminAuthentication')

router.post('/', protect, createOutcome)

router.get('/all', protectAdmin, getAllOutcomes) // ! svarbu buti pirmam
router.get('/:id', protect, getOutcome)
router.get('/:id/all', protect, getOutcomes)

module.exports = router