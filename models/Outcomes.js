const mongoose = require("mongoose");

const outcomeSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        "Rent",
        "Utilities",
        "Food",
        "Transportation",
        "Entertainment",
        "Healthcare",
        "Education",
        "Debt",
        "Other", // fronte bus dropdownas, kur useris is sito saraso pasirinks
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
  },
);

module.exports = mongoose.model("Outcome", outcomeSchema);
