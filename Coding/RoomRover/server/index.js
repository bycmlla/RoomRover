const express = require("express");
const { Router } = require("express");
const server = express();
const router = Router();
const port = 3000;

router.get("/form", (req, res) => {
  res.send("Chegou aqui, criando");
});

router.post("/form", (req, res) => {
  res.send("Chegou aqui, post");
});

router.get("/form/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Chegou aqui!!! ${id}`);
});

server.use(router);

server.listen(port, (error) => {
  if (error) {
    console.log("Error");
    return;
  }
  console.log("Is alright!");
});

module.exports = router;
