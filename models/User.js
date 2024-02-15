const mongoose = require('mongoose')
const Categories = require('./Categories') // Importuojame Categories modelį

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Please fill email field'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please fill password field'],
        },
        categories: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category', // Pakeičiame nuorodą į teisingą modelį
        },
        role: {
            type: String,
            default: 'paprastas',
        },
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    try {
        // Sukurkite naują categories įrašą
        const categories = new Categories()
        await categories.save()

        // Priskirti naujai sukurtą categories įrašą vartotojo laukui
        this.categories = categories._id
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('User', userSchema)
