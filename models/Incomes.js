const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            enum: [
                'Salary',
                'Investments',
                'Business',
                'Freelance',
                'Rent',
                'Royalties',
                'Other', // fronte bus dropdownas, kur useris is sito saraso pasirinks
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
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Income', incomeSchema)
