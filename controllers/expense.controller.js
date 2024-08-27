import Expense from "../models/expense.model.js";

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).populate(
      "user",
      "firstName lastName"
    );
    if (expenses.length <= 0)
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No expenses found for the current user!",
      });

    res.json({
      success: true,
      status: 200,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getExpenseById = async (req, res) => {
  const id = req.params.id;
  try {
    if (id === undefined) {
      return res.status(400).json({ message: "No Expense Id specified" });
    }
    const expense = await Expense.findById(id).populate(
      "user",
      "firstName lastName"
    );

    if (!expense)
      return res
        .status(404)
        .json({ success: false, status: 404, message: "Expense not found" });

    if (expense.user._id.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "You are not authorized." });

    res.json({ success: true, status: 200, data: expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    const user = req.user._id;

    const newExpense = await Expense.create({
      amount,
      date,
      description,
      category,
      user,
    });

    if (!newExpense)
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Failed to create expense. Please try again.",
      });

    res.status(201).json({
      success: true,
      status: 200,
      message: "Expense created successfully",
      data: newExpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    if (req.params.id === undefined) {
      return res.status(400).json({ message: "No Expense Id specified" });
    }
    const { amount, date, description, category } = req.body;
    const expense = await Expense.findById(req.params.id);

    if (!expense)
      return res
        .status(404)
        .json({ success: false, status: 404, message: "Expense not found" });
    if (expense.user.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ message: "You are not authorized to update this expense" });

    expense.amount = amount || expense.amount;
    expense.description = description || expense.description;
    expense.date = date || expense.date;
    expense.category = category || expense.category;
    await expense.save();

    res.json({
      success: true,
      status: 200,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    if (req.params.id === undefined) {
      return res.status(400).json({ message: "No Expense Id specified" });
    }
    const expense = await Expense.findById(req.params.id);

    if (!expense)
      return res
        .status(404)
        .json({ success: false, status: 404, message: "Expense not found" });
    if (expense.user.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this expense" });

    await Expense.findByIdAndDelete(expense._id);
    res.json({
      success: true,
      status: 200,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
