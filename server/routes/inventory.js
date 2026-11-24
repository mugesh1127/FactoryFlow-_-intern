
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all inventory items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM inventory ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
});

// Add inventory item
router.post("/", async (req, res) => {
  try {
    const {
      item_name,
      category,
      quantity,
      unit,
      minimum_stock
    } = req.body;

    const result = await pool.query(
      `INSERT INTO inventory
       (item_name, category, quantity, unit, minimum_stock)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        item_name,
        category,
        quantity,
        unit,
        minimum_stock ?? 10
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to add inventory item" });
  }
});

// Update inventory item
router.put("/:id", async (req, res) => {
  try {
    const {
      item_name,
      category,
      quantity,
      unit,
      minimum_stock
    } = req.body;

    const result = await pool.query(
      `UPDATE inventory
       SET item_name = $1,
           category = $2,
           quantity = $3,
           unit = $4,
           minimum_stock = $5
       WHERE id = $6
       RETURNING *`,
      [
        item_name,
        category,
        quantity,
        unit,
        minimum_stock,
        req.params.id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update inventory item" });
  }
});

// Delete inventory item
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM inventory WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete inventory item" });
  }
});

module.exports = router;
