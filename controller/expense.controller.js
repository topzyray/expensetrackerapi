export const getAllExpenses = (req, res) => {
  console.log("All expenses GET route");
};

export const getExpenseById = (req, res) => {
  console.log(`Expense by ID GET route: ${req.params.id}`);
};

export const createExpense = (req, res) => {
  console.log("Expense POST route");
};

export const updateExpense = (req, res) => {
  console.log(`Expense PUT route: ${req.params.id}`);
};

export const deleteExpense = (req, res) => {
  console.log(`Expense DELETE route: ${req.params.id}`);
};
