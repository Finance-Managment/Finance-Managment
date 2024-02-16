const Outcome = require('../models/Outcome')
const asyncHandler = require('express-async-handler')

//@desc: create outcome
//@method: POST
//@route: http://localhost:3000/api/outcomes
// more details -> CRUDguide.md

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

//@desc: get user outcome by outcome id
//@method: GET
//@route: http://localhost:3000/api/outcomes/:id
// more details -> CRUDguide.md

const getOutcome = asyncHandler(async (req, res) => {
    const outcome = await Outcome.findById(req.params.id)
    if (!outcome) {
        res.status(404)
        throw new Error('Outcome not found')
    }
    res.status(200).json(outcome)
})

//@desc: get all user outcomes by user id
//@method: GET
//@route: http://localhost:3000/api/outcomes/:id/all
// more details -> CRUDguide.md

const getOutcomes = asyncHandler(async (req, res) => {
    try {
        const outcomes = await Outcome.find({ user: req.user._id })
        res.status(200).json({ success: true, data: outcomes })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

//@desc: get all outcomes in general
//@method: GET
//@route: http://localhost:3000/api/outcomes/all
// more details -> CRUDguide.md

const getAllOutcomes = asyncHandler(async (req, res) => {
    try {
        const outcomes = await Outcome.find()
        res.status(201).json({ success: true, data: outcomes })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

module.exports = {
    createOutcome,
    getOutcome,
    getOutcomes,
    getAllOutcomes,
}
