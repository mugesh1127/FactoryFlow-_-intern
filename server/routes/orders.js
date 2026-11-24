
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all orders
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// Add a new order
router.post("/", async (req, res) => {
  try {
    const {
      order_number,
      customer,
      product,
      quantity,
      status,
      due_date
    } = req.body;

    const result = await pool.query(
      `INSERT INTO orders
       (order_number, customer, product, quantity, status, due_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        order_number,
        customer,
        product,
        quantity,
        status || "Pending",
        due_date || null
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
});

// Update an order
router.put("/:id", async (req, res) => {
  try {
    const {
      order_number,
      customer,
      product,
      quantity,
      status,
      due_date
    } = req.body;

    const result = await pool.query(
      `UPDATE orders
       SET order_number = $1,
           customer = $2,
           product = $3,
           quantity = $4,
           status = $5,
           due_date = $6
       WHERE id = $7
       RETURNING *`,
      [
        order_number,
        customer,
        product,
        quantity,
        status,
        due_date || null,
        req.params.id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order" });
  }
});

// Delete an order
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order" });
  }
});

module.exports = router;
