const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Config
require("dotenv").config();
require("./config/mongodb");

// Import Routes
const router = require("./routes");

// Create Express App
const app = express();

// Cookie Parser
app.use(cookieParser());

// Cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// JSON and URL pareser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security ---> It setup some security headers
app.use(helmet());

// Static files
//app.use(express.static(path.resolve('data')));

app.use(express.static(path.resolve('client/build')));

// Routers
app.use("/api", router);

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ success: false, msg: [error.message] });
});


// Listening port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
