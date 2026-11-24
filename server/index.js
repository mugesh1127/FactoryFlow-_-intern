
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/employees", require("./routes/employees"));
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/production", require("./routes/production"));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FactoryFlow API is running"
  });
});

if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client/dist");

  app.use(express.static(clientPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    res.sendFile(path.join(clientPath, "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`FactoryFlow server running on port ${PORT}`);
});
