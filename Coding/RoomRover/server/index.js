const express = require("express");
const server = express();
const port = 3000;
const router = require("./api/mainRouter");

router(server);

server.listen(port, (error) => {
  if (error) {
    console.log("Error");
    return;
  }
  console.log("Is alright!");
});
