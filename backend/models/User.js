const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, 'Please add name'],
        },
        email: {
            type: String,
            required: [true, 'Please add email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add password'],
        },
        role: {
            type: String,
            default: 'paprastas',
        },
        incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }],
        outcomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outcome' }],
        savings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Saving' }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
