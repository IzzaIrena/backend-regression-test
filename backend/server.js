const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const db = require("./config/database");


// PENTING: LOAD RELASI MODEL
require("./models");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const recipeRoutes = require("./routes/recipe");
const savedRecipeRoutes = require("./routes/SavedRecipes");
const reviewRoutes = require("./routes/review");
const followRoutes =require("./routes/follow");

const app = express();

// Helmet security headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use("/uploads", express.static("uploads"));

// middleware
app.use(cors({
 origin: [
  "http://localhost:5173",
  "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Rate Limiter API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 10000, // max request
  message: "Too many requests, try again later.",
});

app.use("/api", limiter);

// routes
app.use("/api", authRoutes);

app.use("/api/profile", profileRoutes); 

app.use("/api/recipes", recipeRoutes);

app.use("/api/saved-recipes", savedRecipeRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/follow", followRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

db.sync()
  .then(() => {
    console.log("Database synced");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Sync Error:", err);
  });
// database
// db.authenticate()
//   .then(() => console.log("Database connected"))
//   .catch((err) => console.log("DB Error:", err));


// app.post(
//   "/api/login",
//   [
//     body("email")
//       .isEmail()
//       .withMessage("Format email tidak valid"),

//     body("password")
//       .isLength({ min: 6 })
//       .withMessage("Password minimal 6 karakter"),
//   ],
//   (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         errors: errors.array(),
//       });
//     }

//     res.send("LOGIN SERVER LANGSUNG");
//   }
// );

module.exports = app;