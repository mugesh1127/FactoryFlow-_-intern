
const fs = require("fs");
const path = require("path");
const pool = require("./db");

async function seedDatabase() {
  try {
    const filePath = path.join(__dirname, "seed.sql");
    const sql = fs.readFileSync(filePath, "utf8");

    await pool.query(sql);

    console.log("Sample data inserted successfully!");
  } catch (error) {
    console.error("Error inserting sample data:", error.message);
  } finally {
    await pool.end();
  }
}

seedDatabase();
