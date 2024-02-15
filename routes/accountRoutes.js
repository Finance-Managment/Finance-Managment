const express = require('express')
const router = express.Router()

const protect = require('../middleware/authentication')

const {
    setupAccount,
    getAccounts,
    updateAccount,
    deleteAccount,
} = require('../controllers/accountController')

router.route('/').post(protect, setupAccount).get(protect, getAccounts)
router.route('/:id').put(protect, updateAccount).delete(protect, deleteAccount)

module.exports = router
