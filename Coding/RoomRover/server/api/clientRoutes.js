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

      const token = generateToken(user.idclient);
      console.log("token gerado", token);

      res.status(200).json({ status: true, token });
    });
  });
});

router.get("/form/read/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM roomrover.client WHERE idClient = ?";
  connection.query(sql, [userId], (error, result) => {
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

router.put("/form/update/:userId", (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  const sql = "UPDATE roomrover.client SET ? WHERE idClient = ?";
  connection.query(sql, [updatedData, userId], (error, result) => {
    if (error) {
      res.status(500).send({
        status: false,
        message: "Erro ao atualizar dados do formulário",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "Dados do formulário atualizados com sucesso",
      });
    }
  });
});

router.delete("/form/delete/:userId", (req, res) => {
  const userId = req.params.userId;

  const getIdsSql =
    "SELECT idaddressfk, idpassportfk FROM roomrover.client WHERE idclient = ?";
  connection.query(getIdsSql, userId, (error, result) => {
    if (error) {
      res.status(500).send({
        status: false,
        message: "Erro ao obter IDs de endereço e passaporte do cliente",
      });
    } else {
      if (result.length > 0) {
        const idaddressfk = result[0].idaddressfk;
        const idpassportfk = result[0].idpassportfk;

        const deleteReservationSql =
          "DELETE FROM roomrover.reservation WHERE idclientfk = ?";
        connection.query(deleteReservationSql, userId, (error, reservationResult) => {
          if (error) {
            res.status(500).send({
              status: false,
              message: "Erro ao deletar reservas do cliente",
            });
          } else {
            const deleteClientSql =
              "DELETE FROM roomrover.client WHERE idClient = ?";
            connection.query(deleteClientSql, userId, (error, clientResult) => {
              if (error) {
                console.error("Erro ao deletar cliente:", error);
                res.status(500).send({
                  status: false,
                  message: "Erro ao deletar cliente",
                });
              } else {
                const deleteAddressSql =
                  "DELETE FROM roomrover.address WHERE idadress = ?";
                connection.query(
                  deleteAddressSql,
                  idaddressfk,
                  (error, addressResult) => {
                    if (error) {
                      console.error("Erro ao deletar endereço:", error);
                      res.status(500).send({
                        status: false,
                        message: "Erro ao deletar endereço",
                      });
                    } else {
                      const deletePassportSql =
                        "DELETE FROM roomrover.passport WHERE idpassport = ?";
                      connection.query(
                        deletePassportSql,
                        idpassportfk,
                        (error, passportResult) => {
                          if (error) {
                            console.error("Erro ao deletar passaporte:", error);
                            res.status(500).send({
                              status: false,
                              message: "Erro ao deletar passaporte",
                            });
                          } else {
                            res.status(200).send({
                              status: true,
                              message:
                                "Usuário, reservas e dados relacionados deletados com sucesso",
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            });
          }
        });
      } else {
        res
          .status(404)
          .send({ status: false, message: "Usuário não encontrado" });
      }
    }
  });
});

router.get("/form/hotels", (req, res) => {
  const sql = "SELECT * FROM roomrover.hotel";

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Erro ao obter dados dos hotéis:", error);
      res
        .status(500)
        .send({ status: false, message: "Erro ao obter dados dos hotéis" });
    } else {
      res.status(200).send({ status: true, data: results });
    }
  });
});
router.get("/form/rooms/:idhotelfk", (req, res) => {
  const idhotelfk = req.params.idhotelfk;
  const sql = "SELECT * FROM roomrover.rooms WHERE idhotelfk = ?";

  connection.query(sql, [idhotelfk], (error, results) => {
    if (error) {
      console.error("Erro ao obter dados dos quartos:", error);
      res
        .status(500)
        .send({ status: false, message: "Erro ao obter dados dos quartos" });
    } else {
      res.status(200).send({ status: true, data: results });
    }
  });
});

router.post("/form/rooms/reservation", (req, res) => {
  const reservationData = req.body;
  console.log("Dados da reserva recebidos no servidor:", reservationData);

  const sql = "INSERT INTO roomrover.reservation SET ?";
  connection.query(sql, reservationData, (error, result) => {
    if (error) {
      console.error("Erro ao inserir reserva no banco de dados:", error);
      res.status(500).send({
        status: false,
        message: "Erro ao inserir reserva no banco de dados",
      });
    } else {
      console.log("Reserva inserida no banco de dados com sucesso.");
      res.status(200).send({
        status: true,
        message: "Reserva realizada com sucesso!",
      });
    }
  });
});

router.get("/form/reservation/list/:userId", (req, res) => {
  let userId = req.params.userId;

  let sql = `
  SELECT 
    r.idreservation, 
    r.checkin, 
    r.checkout, 
    h.name AS hotelName, 
    h.adress 
  FROM 
    roomrover.reservation r 
  JOIN 
    roomrover.rooms rm ON r.idroomfk = rm.idrooms 
  JOIN 
    roomrover.hotel h ON rm.idhotelfk = h.idhotel 
  WHERE 
    r.idclientfk = ?
`;

  connection.query(sql, [userId], (error, results, fields) => {
    if (error) {
      console.error("Erro ao executar a consulta SQL:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
      return;
    }

    res.status(200).json(results);
  });
});

router.get("/form/reservations/details/:idReservation", (req, res) => {
  const idReservation = req.params.idReservation;

  let sql = `
    SELECT 
      r.idreservation, 
      h.name AS hotelName, 
      r.checkin, 
      r.checkout, 
      rm.priceroom AS valorHospedagem
    FROM 
      reservation r 
    JOIN 
      rooms rm ON r.idroomfk = rm.idrooms 
    JOIN 
      hotel h ON rm.idhotelfk = h.idhotel 
    WHERE 
      r.idreservation = ?
  `;

  connection.query(sql, [idReservation], (error, results, fields) => {
    if (error) {
      console.error("Erro ao executar a consulta SQL:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Reserva não encontrada" });
      return;
    }

    const reservationDetails = results[0];
    res.status(200).json(reservationDetails);
  });
});

router.delete("/form/reservations/cancel/:idReservation", (req, res) => {
  const idReservation = req.params.idReservation;

  let sql = `DELETE FROM roomrover.reservation WHERE idreservation = ?`;

  connection.query(sql, [idReservation], (error, results, fields) => {
    if (error) {
      console.error("Erro ao cancelar reserva:", error);
      res.status(500).json({ error: "Erro interno do servidor ao cancelar reserva" });
      return;
    }

    res.status(200).json({ message: "Reserva cancelada com sucesso" });
  });
})

module.exports = router;
