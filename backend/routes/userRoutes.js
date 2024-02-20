const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getUser,
    getAllUsers,
    deleteUser,
} = require('../controllers/userController.js')

const protect = require('../middleware/authentication.js')
const protectAdmin = require('../middleware/adminAuthentication.js')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/user', protect, getUser)
router.get('/users', protectAdmin, getAllUsers)
router.delete('/:id', protectAdmin, deleteUser)

module.exports = router
