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

// Set Domain offset
if(process.env.NODE_ENV === 'production') {
  app.set('subdomain offset', 2);
}
else {
  // This is for localhost
  app.set('subdomain offset', 1);
}

// Cookie Parser
app.use(cookieParser());

// Cors
app.use(
  cors({
    origin: function (origin, callback) {
      const regularEx = RegExp(`${process.env.CLIENT_DOMAIN}$`, 'i');

      if(regularEx.test(origin)) {
        callback(null, true);
      }
      else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

// JSON and URL pareser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security ---> It setup some security headers
app.use(helmet());

// Static files
app.use(express.static(path.resolve('data')));

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
