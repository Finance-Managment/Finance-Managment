const express = require('express')
const router = express.Router()

const {
    createSaving,
    getSaving,
    getSavings,
    getAllSavings,
    updateSaving,
    deleteSaving,
} = require('../controllers/savingController.js')
const protect = require('../middleware/authentication.js')
const protectAdmin = require('../middleware/adminAuthentication.js')

router.post('/', protect, createSaving)

router.get('/all', protectAdmin, getAllSavings) // ! svarbu buti pirmam
router.get('/:id', protect, getSaving)
router.get('/:id/all', protect, getSavings)
router.put('/:id', updateSaving)
router.delete('/:id', deleteSaving)

module.exports = router