const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = Router();
const connection = require("../services/database/databaseConnection");
const { generateToken } = require("../utils/auth");

router.post("/form/add", (req, res) => {
  console.log("Dados recebidos no servidor:", req.body);

  let addressDetails = {
    country: req.body.endereco.pais,
    address: req.body.endereco.endereco,
    city: req.body.endereco.cidade,
    zipcode: req.body.endereco.cep,
  };

  let sqlAddress = "INSERT INTO roomrover.address SET ?";

  connection.query(
    sqlAddress,
    addressDetails,
    (addressError, addressResponse) => {
      if (addressError) {
        console.error("Erro ao criar endereço", addressError);
        res
          .status(500)
          .send({ status: false, message: "Erro ao criar endereço" });
      } else {
        console.log("Endereço criado com sucesso.");

        let passportDetails = {
          namePassport: req.body.passaporte.nomePassaporte,
          number: req.body.passaporte.numero,
          issuingCountry: req.body.passaporte.paisEmissor,
          expirationDate: req.body.passaporte.dataExpiracao,
        };
        let sqlPassport = "INSERT INTO roomrover.passport SET ?";

        connection.query(
          sqlPassport,
          passportDetails,
          (passportError, passportResponse) => {
            if (passportError) {
              console.error("Erro ao criar passaporte", passportError);
              res
                .status(500)
                .send({ status: false, message: "Erro ao criar passaporte" });
            } else {
              console.log("Passaporte criado com sucesso.");

              bcrypt.hash(req.body.senha, 10, (hashError, hashedPassword) => {
                if (hashError) {
                  console.error("Erro ao gerar hash da senha", hashError);
                  res
                    .status(500)
                    .send({ status: false, message: "Erro ao criar cliente" });
                } else {
                  let clientDetails = {
                    name: req.body.nome,
                    email: req.body.email,
                    phone: req.body.phone,
                    birthdate: req.body.nascimento,
                    nationality: req.body.nacionalidade,
                    gender: req.body.genero,
                    password: hashedPassword,
                    idaddressfk: addressResponse.insertId,
                    idpassportfk: passportResponse.insertId,
                  };

                  let sqlClient = "INSERT INTO roomrover.client SET ?";
  
                  connection.query(
                    sqlClient,
                    clientDetails,
                    (clientError, clientResponse) => {
                      if (clientError) {
                        console.error("Erro ao criar cliente", clientError);
                        res.status(500).send({
                          status: false,
                          message: "Erro ao criar cliente",
                        });
                      } else {
                        console.log("Cliente criado com sucesso.");
                        res.setHeader("Content-Type", "application/json");
                        res.status(200).send({
                          status: true,
                          message: "Registro criado com sucesso",
                        });
                      }
                    }
                  );
                }
              });
            }
          }
        );
      }
    }
  );
});


router.post("/form/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Email:", email);
  console.log("Senha:", password);

  const sql = "SELECT * FROM roomrover.client WHERE email = ?";
  connection.query(sql, [email], (error, result) => {
    if (error) {
      console.log("Erro ao buscar usuário", error);
      return res
        .status(500)
        .send({ status: false, message: "Erro ao buscar usuário" });
    }

    if (result.length === 0) {
      return res
        .status(401)
        .send({ status: false, message: "Credenciais inválidas" });
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (bcryptError, passwordMatch) => {
      if (bcryptError || !passwordMatch) {
        return res
          .status(401)
          .send({ status: false, message: "Credenciais inválidas" });
      }

      const token = generateToken(user.id);
      console.log("token gerado", token);

      res.status(200).json({ status: true, token });
    });
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
