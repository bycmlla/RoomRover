const { Router } = require("express");
const router = Router();
const connection = require("../services/database/databaseConnection");

router.post("/form/add", (req, res) => {
  console.log("Dados recebidos no servidor:", req.body);

  let addressDetails = {
    country: req.body.endereco.pais,
    address: req.body.endereco.endereco,
    city: req.body.endereco.cidade,
    zipcode: req.body.endereco.cep,
  };
  
  let sqlAddress = "INSERT INTO roomrover.address SET ?";
  
  connection.query(sqlAddress, addressDetails, (addressError, addressResponse) => {
    if (addressError) {
      console.error("Erro ao criar endereço", addressError);
      res.status(500).send({ status: false, message: "Erro ao criar endereço" });
    } else {
      console.log("Endereço criado com sucesso.");

      let passportDetails = {
        namePassport: req.body.passaporte.nomePassaporte,
        number: req.body.passaporte.numero,
        issuingCountry: req.body.passaporte.paisEmissor,
        expirationDate: req.body.passaporte.dataExpiracao,
      };
      let sqlPassport = "INSERT INTO roomrover.passport SET ?";

      connection.query(sqlPassport, passportDetails, (passportError, passportResponse) => {
        if (passportError) {
          console.error("Erro ao criar passaporte", passportError);
          res.status(500).send({ status: false, message: "Erro ao criar passaporte" });
        } else {
          console.log("Passaporte criado com sucesso.");

          let clientDetails = {
            name: req.body.nome,
            email: req.body.email,
            phone: req.body.phone,
            birthdate: req.body.nascimento,
            nationality: req.body.nacionalidade,
            gender: req.body.genero,
            password: req.body.senha,
            idaddressfk: addressResponse.insertId,
            idpassportfk: passportResponse.insertId,
          };
          let sqlClient = "INSERT INTO roomrover.client SET ?";

          connection.query(sqlClient, clientDetails, (clientError, clientResponse) => {
            if (clientError) {
              console.error("Erro ao criar cliente", clientError);
              res.status(500).send({ status: false, message: "Erro ao criar cliente" });
            } else {
              console.log("Cliente criado com sucesso.");
              res.setHeader("Content-Type", "application/json");
              res.status(200).send({ status: true, message: "Registro criado com sucesso" });
            }
          });
        }
      });
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
      res.status(200).send({
        status: true,
        data: result,
        message: "Dados do formulário obtidos com sucesso",
      });
    }
  });
});

module.exports = router;
