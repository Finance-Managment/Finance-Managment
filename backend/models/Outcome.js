const mongoose = require('mongoose')

const outcomeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            enum: [
                'Rent',
                'Utilities',
                'Food',
                'Transportation',
                'Entertainment',
                'Healthcare',
                'Education',
                'Debt',
                'Other',
            ],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: false,
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

module.exports = mongoose.model('Outcome', outcomeSchema)
