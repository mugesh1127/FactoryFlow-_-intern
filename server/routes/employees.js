
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all employees
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees" });
  }
});

// Add employee
router.post("/", async (req, res) => {
  try {
    const { name, role, department, email, phone } = req.body;

    const result = await pool.query(
      `INSERT INTO employees
       (name, role, department, email, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, role, department, email || null, phone || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to add employee" });
  }
});

// Update employee
router.put("/:id", async (req, res) => {
  try {
    const { name, role, department, email, phone } = req.body;

    const result = await pool.query(
      `UPDATE employees
       SET name = $1,
           role = $2,
           department = $3,
           email = $4,
           phone = $5
       WHERE id = $6
       RETURNING *`,
      [name, role, department, email || null, phone || null, req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update employee" });
  }
});

// Delete employee
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM employees WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee" });
  }
});

module.exports = router;
