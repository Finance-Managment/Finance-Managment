const Income = require('../models/Income')
const asyncHandler = require('express-async-handler')

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

module.exports = {
    createIncome,
}
