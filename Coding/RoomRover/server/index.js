const express = require("express");
const server = express();
const port = 8080;
const router = require("./api/mainRouter");
const cors = require("cors");
const bodyParser = require("body-parser");

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

router(server);

server.listen(port, (error) => {
  if (error) {
    console.log("Error");
    return;
  }
  console.log(`Is alright! On the port: ${port}`);
});
