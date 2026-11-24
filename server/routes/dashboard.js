
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const [
      orders,
      production,
      inventory,
      employees
    ] = await Promise.all([
      pool.query(`
        SELECT
          COUNT(*) AS total,
          COUNT(*) FILTER (WHERE status = 'Completed') AS completed,
          COUNT(*) FILTER (WHERE status = 'Pending') AS pending
        FROM orders
      `),

      pool.query(`
        SELECT
          COUNT(*) AS total,
          COUNT(*) FILTER (WHERE status = 'Completed') AS completed,
          COUNT(*) FILTER (WHERE status = 'In Progress') AS in_progress
        FROM production_tasks
      `),

      pool.query(`
        SELECT
          COUNT(*) AS total,
          COUNT(*) FILTER (
            WHERE quantity <= minimum_stock
          ) AS low_stock
        FROM inventory
      `),

      pool.query(`
        SELECT COUNT(*) AS total
        FROM employees
      `)
    ]);

    res.json({
      orders: orders.rows[0],
      production: production.rows[0],
      inventory: inventory.rows[0],
      employees: employees.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard statistics"
    });
  }
});

module.exports = router;
