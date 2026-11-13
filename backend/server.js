
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Connect SQLite database
const db = require("./config/db");

// Import authentication routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Homepage route
app.get("/", (req, res) => {
    res.send("Welcome to Uplyst Backend! 🚀");
});

// Health check route
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Uplyst backend is running!",
        database: "SQLite connected"
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Uplyst server running on port ${PORT}`);
});
