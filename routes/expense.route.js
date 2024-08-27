import express from "express";
import passport from "../middlewares/passportAuth.js";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
} from "../controllers/expense.controller.js";
import {
  ValidateExpenseUpdateMW,
  ValidateNewExpenseMW,
} from "../validators/expense.validator.js";

const expenseRouter = express.Router();

expenseRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllExpenses
);
expenseRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getExpenseById
);
expenseRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ValidateNewExpenseMW,
  createExpense
);
expenseRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ValidateExpenseUpdateMW,
  updateExpense
);
expenseRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteExpense
);

export default expenseRouter;
