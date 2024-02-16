const Outcome = require('../models/Outcome')
const asyncHandler = require('express-async-handler')

const createOutcome = asyncHandler(async (req, res) => {
    if (!req.body.category || !req.body.amount) {
        res.status(400)
        throw new Error('Please add all required fields')
    }

    const outcome = await Outcome.create({
        title: req.body.title,
        category: req.body.category,
        amount: req.body.amount,
        description: req.body.description,
        user: req.user._id,
    })

    // ! BUTINA
    req.user.outcomes.push(outcome._id)
    await req.user.save()

    res.status(201).json(outcome)
})

module.exports = {
    createOutcome,
}
