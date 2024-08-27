import Joi from "joi";

const createExpenseSchema = Joi.object({
  amount: Joi.number().greater(0).required().messages({
    "number.base": "Amount must be a number",
    "number.greater": "Amount must be greater than 0",
    "any.required": "Amount is required",
  }),
  description: Joi.string().trim().required().messages({
    "string.base": "Description must be a string",
    "any.required": "Description is required",
  }),
  category: Joi.string()
    .valid("Food", "Transportation", "Utilities", "Entertainment", "Other")
    .required()
    .messages({
      "string.base": "Category must be a string",
      "string.valid":
        "Category must be one of Food, Transportation, Utilities, Entertainment, or Other",
      "any.required": "Category is required",
    }),
  date: Joi.date().default(Date.now).messages({
    "date.base": "Date must be a valid date",
  }),
  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.base": "user must be a string",
      "string.pattern.base": "user must be a valid MongoDB ObjectId",
      "any.required": "user is required",
    }),
});

const updateExpenseSchema = Joi.object({
  amount: Joi.number().greater(0).messages({
    "number.base": "Amount must be a number",
    "number.greater": "Amount must be greater than 0",
  }),
  description: Joi.string().trim().messages({
    "string.base": "Description must be a string",
  }),
  category: Joi.string()
    .valid("Food", "Transportation", "Utilities", "Entertainment", "Other")
    .messages({
      "string.base": "Category must be a string",
      "string.valid":
        "Category must be one of Food, Transportation, Utilities, Entertainment, or Other",
    }),
  date: Joi.date().messages({
    "date.base": "Date must be a valid date",
  }),
  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.base": "user must be a string",
      "string.pattern.base": "user must be a valid MongoDB ObjectId",
    }),
});

export const ValidateNewExpenseMW = async (req, res, next) => {
  const expensePayload = req.body;
  try {
    await createExpenseSchema.validateAsync(expensePayload);
    next();
  } catch (err) {
    next({
      message: err.details[0].message,
      status: 400,
    });
  }
};

export const ValidateExpenseUpdateMW = async (req, res, next) => {
  const expensePayload = req.body;
  try {
    await updateExpenseSchema.validateAsync(expensePayload);
    next();
  } catch (err) {
    next({
      message: err.details[0].message,
      status: 400,
    });
  }
};
