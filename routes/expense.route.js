import express from "express";
import passport from "../middlewares/passportAuth.js";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
} from "../controller/expense.controller.js";
import {
  ValidateExpenseUpdateMW,
  ValidateNewExpenseMW,
} from "../validators/expense.validator.js";

const expenseRouter = express.Router();

expenseRouter.get(
  "/expenses",
  passport.authenticate("jwt", { session: false }),
  getAllExpenses
);
expenseRouter.post(
  "/expenses",
  passport.authenticate("jwt", { session: false }),
  ValidateNewExpenseMW,
  createExpense
);
expenseRouter.put(
  "/expenses/:id",
  passport.authenticate("jwt", { session: false }),
  ValidateExpenseUpdateMW,
  updateExpense
);
expenseRouter.delete(
  "/expenses/:id",
  passport.authenticate("jwt", { session: false }),
  deleteExpense
);

export default expenseRouter;
