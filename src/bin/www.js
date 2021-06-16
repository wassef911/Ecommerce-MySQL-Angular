#!/usr/bin/env node
const debug = require("debug")("backend:server");
const http = require("http");
const app = require("../app");

//Normalize a port into a number, string, or false.
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) return val;
  // port number
  if (port >= 0) return port;

  return false;
};

// Event listener for HTTP server "error" event.
const onError = (error) => {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
};

//Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//Create HTTP server.
const server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.listen(port, () => {
  //Event listener for HTTP server "listening" event.
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log("Server running", bind);
});
server.on("error", onError);
