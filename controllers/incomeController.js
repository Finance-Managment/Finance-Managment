const Income = require('../models/Income')
const asyncHandler = require('express-async-handler')

//@desc: create income
//@method: POST
//@route: http://localhost:3000/api/incomes
// more details -> CRUDguide.md

const createIncome = asyncHandler(async (req, res) => {
    if (!req.body.category || !req.body.amount) {
        res.status(400)
        throw new Error('Please add all required fields')
    }

    const income = await Income.create({
        title: req.body.title,
        category: req.body.category,
        amount: req.body.amount,
        description: req.body.description,
        user: req.user._id,
    })

    // ! BUTINA
    req.user.incomes.push(income._id)
    await req.user.save()

    res.status(201).json(income)
})

//@desc: get user income by income id
//@method: GET
//@route: http://localhost:3000/api/incomes/:id
// more details -> CRUDguide.md

const getIncome = asyncHandler(async (req, res) => {
    const income = await Income.findById(req.params.id)
    if (!income) {
        res.status(404)
        throw new Error('Income not found')
    }
    res.status(200).json(income)
})

//@desc: get all user incomes by user id
//@method: GET
//@route: http://localhost:3000/api/incomes/:id/all
// more details -> CRUDguide.md

const getIncomes = asyncHandler(async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user._id })
        res.status(200).json({ success: true, data: incomes })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

//@desc: get all incomes in general
//@method: GET
//@route: http://localhost:3000/api/incomes/all
// more details -> CRUDguide.md

const getAllIncomes = asyncHandler(async (req, res) => {
    try {
        const incomes = await Income.find()
        res.status(201).json({ success: true, data: incomes })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

module.exports = {
    createIncome,
    getIncome,
    getIncomes,
    getAllIncomes,
}
