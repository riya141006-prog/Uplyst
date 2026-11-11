
const bcrypt = require("bcryptjs");
const db = require("../config/db");

// =================================
// REGISTER NEW USER
// =================================

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        // Check required fields
        if (!fullName || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });
        }

        // Clean input
        const cleanName = fullName.trim();
        const cleanEmail = email.trim().toLowerCase();

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        // Validate password
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 8 characters."
            });
        }

        // Validate role
        const allowedRoles = [
            "student",
            "graduate",
            "professional"
        ];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid role."
            });
        }

        // Check existing email
        const existingUser = db.prepare(
            "SELECT id FROM users WHERE email = ?"
        ).get(cleanEmail);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Save user in SQLite
        const result = db.prepare(`
            INSERT INTO users (fullName, email, password, role)
            VALUES (?, ?, ?, ?)
        `).run(cleanName, cleanEmail, hashedPassword, role);

        // Send success response
        return res.status(201).json({
            success: true,
            message: "Your Uplyst account has been created!",
            user: {
                id: Number(result.lastInsertRowid),
                fullName: cleanName,
                email: cleanEmail,
                role
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong during registration."
        });
    }
};

module.exports = { registerUser };
