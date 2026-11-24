
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/employees", require("./routes/employees"));
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/production", require("./routes/production"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "FactoryFlow API is running"
  });
});

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../client/dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`FactoryFlow server running on port ${PORT}`);
});
