const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// Import Routes lahne
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: "Content-type, Authorization, Origin ",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use Routes
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
