const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const db = require("./config/database");

// LOAD RELASI MODEL
require("./models");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const recipeRoutes = require("./routes/recipe");
const savedRecipeRoutes = require("./routes/SavedRecipes");
const reviewRoutes = require("./routes/review");
const followRoutes = require("./routes/follow");

const app = express();

// Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use("/uploads", express.static("uploads"));

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({
  limit: "50mb",
  extended: true
}));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: "Too many requests, try again later.",
});

app.use("/api", limiter);

// Routes
app.use("/api", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/saved-recipes", savedRecipeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/follow", followRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

async function connectDB() {
  try {
    await db.authenticate();
    console.log("Database connected");

    await db.sync();
    console.log("Database synced");
  } catch (err) {
    console.log("DB Sync Error:", err);
  }
}

module.exports = { app, db, connectDB };