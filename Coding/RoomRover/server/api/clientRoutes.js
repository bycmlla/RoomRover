const { Router } = require("express");
const router = Router();
// const formController = require("../controllers/formController");
const connection = require("../services/database/databaseConnection");

router.get("/form/add", (req, res) => {
  let details = {
    name: req.body.nome,
    email: req.body.email,
    phone: req.body.phone,
    birthdate: req.body.nascimento,
    nationality: req.body.nacionalidade,
    gender: req.body.genero,
  };
  
  let sql = "INSERT INTO test.users SET ?";

  connection.query(sql, details, (error, response) => {
    if (error) {
      res.status(500).send({ status: false, message: "Erro ao criar" });
    } else {
      console.log("Deu certo");
      res.status(200).send({ status: true, message: "Registro criado com sucesso" });
    }
  });

  // const response = formController.insertFormData();
  // res.send(response);
});

router.get("/form", (req, res) => {
  const sql = "SELECT * FROM test.users"
  // Lógica para obter todos os dados do formulário
  connection.query(sql, (error, result) => {
    if (error) {
      res.status(500).send({ status: false, message: "Erro ao obter dados do formulário" });
    } else {
      res.status(200).send({ status: true, data: result, message: "Dados do formulário obtidos com sucesso" });
    }
  });
});


// router.get("/form/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const response = await formController.updateData(id);
//     res.send(response);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

module.exports = router;
