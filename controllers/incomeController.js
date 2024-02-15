// !User story: Vartotojas gauna forma uzpildyti gautu pajamu forma, kurioje:
// 1. is dropdown pasirenka kategorija, is kurios gavo pajamas
// 2. iraso skaiciu kiek pinigu gavo
// 3. laukelyje gali pasilikti sau uzrasa.
// 4. vartotojas paspaudzia submit mygtuka, ir si forma ikrenta i mongoDB kolekcija pas useri.

// !Extra:
// Vartotojas gales redaguoti/istrinti savo forma po jos pateikimo

// ! AI generuotas pavyzdys kaip mazdaug atrodys controleris:

const Income = require("../models/income");

// Controller to handle creating a new income
exports.createIncome = async (req, res) => {
  try {
    const { category, amount, description } = req.body;
    const newIncome = new Income({
      category,
      amount,
      description,
    });
    await newIncome.save();
    res.status(201).json({ success: true, data: newIncome });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to handle fetching all incomes
exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json({ success: true, data: incomes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to handle fetching a single income by ID
exports.getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res
        .status(404)
        .json({ success: false, error: "Income not found" });
    }
    res.status(200).json({ success: true, data: income });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to handle updating an income
exports.updateIncome = async (req, res) => {
  try {
    const { category, amount, description } = req.body;
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      { category, amount, description },
      { new: true },
    );
    if (!updatedIncome) {
      return res
        .status(404)
        .json({ success: false, error: "Income not found" });
    }
    res.status(200).json({ success: true, data: updatedIncome });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to handle deleting an income
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res
        .status(404)
        .json({ success: false, error: "Income not found" });
    }
    await income.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
