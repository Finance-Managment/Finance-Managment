const express = require('express')
const router = express.Router()

const {
    createOutcome,
    getOutcome,
    getOutcomes,
    getAllOutcomes,
    updateOutcome,
    deleteOutcome,
} = require('../controllers/outcomeController.js')
const protect = require('../middleware/authentication.js')
const protectAdmin = require('../middleware/adminAuthentication.js')

router.post('/', protect, createOutcome)

router.get('/all', protectAdmin, getAllOutcomes) // ! svarbu buti pirmam
router.get('/:id', protect, getOutcome)
router.get('/:id/all', protect, getOutcomes)
router.put('/:id', updateOutcome)
router.delete('/:id', deleteOutcome)

module.exports = router
