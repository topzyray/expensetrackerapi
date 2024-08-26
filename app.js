import express from "express";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorHandler.js";
import expenseRouter from "./routes/expense.route.js";

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api", expenseRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Expense Tracker API");
});

// Error handling middleware
app.use(errorHandler);

export default app;
