const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./src/configs/db"); // Import the database connection
const routeLoader = require("./routeLoader"); // Import the route loader
const path = require("path");

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use("/uploads", express.static("uploads")); // for direct links
app.use("/Reports", express.static("Reports")); // for direct links
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// Use routes using the route loader
routeLoader(app);
// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(
  "/api/uploads",
  function (req, res, next) {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "uploads/"))
);
