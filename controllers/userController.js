// Imports

const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

// Operations

// @method POST
// @route http://localhost:3000/api/users
// more details -> CRUDguide.md

const registerUser = asyncHandler(async (req, res) => {
    const { firstname, email, password } = req.body
    if (!firstname || !email || !password) {
        res.status(400)
        throw new Error('Fields are incorrect/missing')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(8)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstname,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            firstname: user.firstname,
            email: user.email,
            token: generateToken(user._id),
            role: user.role,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// @method POST
// @route http://localhost:3000/api/users/login
// more details -> CRUDguide.md

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    // user.password - is db uzkoduotas password, lygina login'e ivesta passworda su db esanciu uzkoduotu passwordu
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            firstname: user.firstname,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @method GET
// @route http://localhost:3000/api/users/user
// more details -> CRUDguide.md

const getUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

//@method PUT
//@route http://localhost:3000/api/users/:id
// more details -> CRUDguide.md

const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id
    const { firstname, email, password } = req.body

    const user = await User.findById(userId)

    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }

    user.firstname = firstname || user.firstname
    user.email = email || user.email

    if (password) {
        const salt = await bcrypt.genSalt(8)
        user.password = await bcrypt.hash(password, salt)
    }
    const updatedUser = await user.save()

    res.json({
        _id: updatedUser._id,
        firstname: updatedUser.firstname,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
        role: updatedUser.role,
    })
})

//@method DELETE
//@route http://localhost:3000/api/users/:id
// more details -> CRUDguide.md

const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id

    const user = await User.findByIdAndDelete(userId)

    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }

    res.json({ message: 'user has been removed' })
})

// @desc get users data
// @route GET /api/users/users
// @access PRIVATE

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
}
