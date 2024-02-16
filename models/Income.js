const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            enum: [
                'Salary',
                'Investments',
                'Business',
                'Freelance',
                'Rent',
                'Royalties',
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

module.exports = mongoose.model('Income', incomeSchema)
