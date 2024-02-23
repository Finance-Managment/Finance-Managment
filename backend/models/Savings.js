const mongoose = require('mongoose')

const savingsSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        months: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Income', savingsSchema)