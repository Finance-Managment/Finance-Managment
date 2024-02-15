const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  incomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Income", // paima income modeli
    },
  ],
  outcomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outcome", // paima outcome modeli
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
