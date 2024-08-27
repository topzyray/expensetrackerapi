import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import expenseRouter from "./routes/expense.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const corsOptions = {
  origin: "*",
  credentials: true,
};

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(limiter);
app.use(helmet());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Expense Tracker API");
});

// Error handling middleware
app.use(errorHandler);

export default app;
