
const { DatabaseSync } = require("node:sqlite");
const path = require("path");

// Create database file inside backend folder
const dbPath = path.join(__dirname, "..", "uplyst.db");

// Open database
const db = new DatabaseSync(dbPath);

// Enable foreign key support
db.exec("PRAGMA foreign_keys = ON");

// Create users table
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

console.log("Uplyst SQLite database connected!");

// Export database connection
module.exports = db;
