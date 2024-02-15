const express = require('express')
const router = express.Router()

const {
    registerUser,
    loginUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
} = require('../controllers/userController')

const protect = require('../middleware/authentication')
const protectAdmin = require('../middleware/adminAuthentication')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/user', protect, getUser)
router.delete('/:id', protect, deleteUser)
router.put('/:id', updateUser)

module.exports = router
