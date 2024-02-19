const express = require('express')
const router = express.Router()

const {
    createIncome,
    getIncome,
    getIncomes,
    getAllIncomes,
    updateIncome,
    deleteIncome,
} = require('../controllers/incomeController')
const protect = require('../middleware/authentication')
const protectAdmin = require('../middleware/adminAuthentication')

router.post('/', createIncome)

router.get('/all', protectAdmin, getAllIncomes) // ! svarbu buti pirmam
router.get('/:id', protect, getIncome)
router.get('/:id/all', protect, getIncomes)
router.put('/:id', updateIncome)
router.delete('/:id', deleteIncome)

module.exports = router
