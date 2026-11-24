
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all production tasks
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        production_tasks.*,
        employees.name AS employee_name,
        orders.order_number
      FROM production_tasks
      LEFT JOIN employees
        ON production_tasks.assigned_to = employees.id
      LEFT JOIN orders
        ON production_tasks.order_id = orders.id
      ORDER BY production_tasks.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch production tasks" });
  }
});

// Add production task
router.post("/", async (req, res) => {
  try {
    const {
      task_name,
      order_id,
      assigned_to,
      status,
      progress,
      start_date,
      due_date
    } = req.body;

    const result = await pool.query(
      `INSERT INTO production_tasks
       (task_name, order_id, assigned_to, status, progress, start_date, due_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        task_name,
        order_id || null,
        assigned_to || null,
        status || "Pending",
        progress ?? 0,
        start_date || null,
        due_date || null
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to add production task" });
  }
});

// Update production task
router.put("/:id", async (req, res) => {
  try {
    const {
      task_name,
      order_id,
      assigned_to,
      status,
      progress,
      start_date,
      due_date
    } = req.body;

    const result = await pool.query(
      `UPDATE production_tasks
       SET task_name = $1,
           order_id = $2,
           assigned_to = $3,
           status = $4,
           progress = $5,
           start_date = $6,
           due_date = $7
       WHERE id = $8
       RETURNING *`,
      [
        task_name,
        order_id || null,
        assigned_to || null,
        status,
        progress,
        start_date || null,
        due_date || null,
        req.params.id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Production task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update production task" });
  }
});

// Delete production task
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM production_tasks WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Production task not found" });
    }

    res.json({ message: "Production task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete production task" });
  }
});

module.exports = router;
