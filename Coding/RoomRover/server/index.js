//O index.js é responsavel pela criação do servidor

const express = require("express");
const cors = require("cors");
const server = express();
const port = 3000;
const router = require("./api/mainRouter");

server.use(cors());
router(server);

server.listen(port, (error) => {
  if (error) {
    console.log("Error");
    return;
  }
  console.log("Is alright!");
  console.log(`Server is running on port ${port}`);
});
