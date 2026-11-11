
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Welcome to Uplyst Backend! 🚀");
});

// Health check route
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Uplyst backend is running!"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Uplyst server running on port ${PORT}`);
});
