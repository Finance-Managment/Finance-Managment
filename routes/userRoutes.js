const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getUser,
    getAllUsers,
    deleteUser,
} = require('../controllers/userController')

const protect = require('../middleware/authentication')
const protectAdmin = require('../middleware/adminAuthentication')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/user', protect, getUser)
router.get('/users', protectAdmin, getAllUsers)
router.delete('/:id', protectAdmin, deleteUser)

module.exports = router
