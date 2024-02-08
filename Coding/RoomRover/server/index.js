const express = require("express");
const server = express();
const port = 8080;
const router = require("./api/mainRouter");
const cors = require('cors');
const bodyParser = require("body-parser");

server.use(cors());
server.use(bodyParser.json());
router(server);

server.listen(port, (error) => {
  if (error) {disc
    console.log("Error");
    return;
  }
  console.log(`Is alright! On the port: ${port}`);
});