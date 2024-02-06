const express = require("express");
const server = express();
const PORT = process.env.PORT || 8080;
const router = require("./api/mainRouter");
const cors = require("cors");
const bodyParser = require("body-parser");

server.use(cors()); // Configuração mais simples

server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));

router(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
