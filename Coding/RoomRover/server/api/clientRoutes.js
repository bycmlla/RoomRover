const { Router } = require("express");
const router = Router();
const connection = require("../services/database/databaseConnection");

router.post("/form/add", (req, res) => {
  console.log("Dados recebidos no servidor:", req.body);
  let details = {
    name: req.body.nome,
    email: req.body.email,
    phone: req.body.phone,
    birthdate: req.body.nascimento,
    nationality: req.body.nacionalidade,
    gender: req.body.genero,
    password: req.body.senha,
  };
  console.log(details);
  let sql = "INSERT INTO roomrover.client SET ?";

  connection.query(sql, details, (error, response) => {
    if (error) {
      console.error("Erro ao criar:", error);
      res.status(500).send({ status: false, message: "Erro ao criar" });
    } else {
      console.log("Deu certo");
      res.setHeader("Content-Type", "application/json");
      res
        .status(200)
        .send({ status: true, message: "Registro criado com sucesso" });
    }
  });
});

router.get("/form/read", (req, res) => {
  const sql = "SELECT * FROM roomrover.client";
  connection.query(sql, (error, result) => {
    if (error) {
      res
        .status(500)
        .send({ status: false, message: "Erro ao obter dados do formulário" });
    } else {
      res
        .status(200)
        .send({
          status: true,
          data: result,
          message: "Dados do formulário obtidos com sucesso",
        });
    }
  });
});

module.exports = router;
