import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Transportation", "Utilities", "Entertainment", "Other"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
