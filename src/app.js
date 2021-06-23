const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");


const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const orderRouter = require("./routes/order");

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "ClothStore API",
      description: "Backend Api",
      contact: {
        name: "Wassef Ben Ahmed",
      },
      servers: "http://localhost:3999",
    },
  },
  apis: ["./app.js", "./routes/*.js"],
};
/*
https://www.npmjs.com/package/swagger-ui-express
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUI.serve);
app.use('/api/docs', swaggerUI.setup(swaggerDocs));
*/


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
app.use("/api/orders", orderRouter);

module.exports = app;
