const Saving = require('../models/Saving.js')
const asyncHandler = require('express-async-handler')

//@desc: create saving
//@method: POST
//@route: http://localhost:3000/api/savings
// more details -> info/CRUDguide.md

const createSaving = asyncHandler(async (req, res) => {
    if (!req.body.description || !req.body.months || !req.body.amount) {
        res.status(400)
        throw new Error('Please add all required fields')
    }

    const saving = await Saving.create({
        description: req.body.description,
        months: req.body.months,
        amount: req.body.amount,
        user: req.user._id,
    })

    // ! BUTINA
    req.user.savings.push(saving._id)
    await req.user.save()

    res.status(201).json(saving)
})

//@desc: get user saving by saving id
//@method: GET
//@route: http://localhost:3000/api/savings/:id
// more details -> info/CRUDguide.md

const getSaving = asyncHandler(async (req, res) => {
    const saving = await Saving.findById(req.params.id)
    if (!saving) {
        res.status(404)
        throw new Error('Saving not found')
    }
    res.status(200).json(saving)
})

//@desc: get all user savings by user id
//@method: GET
//@route: http://localhost:3000/api/savings/:id/all
// more details -> info/CRUDguide.md

const getSavings = asyncHandler(async (req, res) => {
    try {
        const savings = await Saving.find({ user: req.user._id })
        res.status(200).json({ success: true, data: savings })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

//@desc: get all savings in general
//@method: GET
//@route: http://localhost:3000/api/savings/all
// more details -> info/CRUDguide.md

const getAllSavings = asyncHandler(async (req, res) => {
    try {
        const savings = await Saving.find()
        res.status(201).json({ success: true, data: savings })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

//////////////////////////
// @desc: update one of the saving field
// @PUT method
// @route: http://localhost:3000/api/savings/:id
// more details -> info/CRUDguide.md

const updateSaving = async function (req, res) {
    const customSaving = await Saving.findById(req.params.id)
    if (!customSaving) {
        res.status(404).send("Saving ID wasn't found")
        return
    }

    if (req.body.description) {
        customSaving.description = req.body.description
    }
    if (req.body.months) {
        customSaving.months = req.body.months
    }
    if (req.body.amount) {
        customSaving.amount = req.body.amount
    }

    const result = await customSaving.save()
    res.status(200).json(result)
}

////////////////////
// @desc: Delete any saving by saving ID
// @DELETE method
// @route: http://localhost:3000/api/savings/:id
// more details -> info/CRUDguide.md

const deleteSaving = async function (req, res) {
    const customSaving = await Saving.findById(req.params.id)
    if (!customSaving) {
        res.status(404).send("Saving with this ID wasn't found")
        return
    }
    const result = await Saving.deleteOne({ _id: req.params.id })
    res.status(200).send(result)
}

module.exports = {
    createSaving,
    getSaving,
    getSavings,
    getAllSavings,
    updateSaving,
    deleteSaving,
}