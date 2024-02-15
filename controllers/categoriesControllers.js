// const Categories = require('../models/Categories')

// const createCategories = async function (req, res) {
//     if (!req.body.name || !req.body.incomes || !req.body.outcomes) {
//         res.status(400).send('Data not found')
//         return
//     }

//     const existingCategory = await Categories.findOne({ name: req.body.name })
//     if (existingCategory) {
//         res.status(400).send('Category already exists')
//         return
//     }

//     const category = await Categories.create({
//         name: req.body.name,
//         incomes: req.body.incomes,
//         outcomes: req.body.outcomes,
//     })

//     res.status(200).json(category)
// }

// module.exports = {
//     createCategories,
// }
