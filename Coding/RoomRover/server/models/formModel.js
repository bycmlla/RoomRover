// o formModel é responsavel por criar as chamadas ao banco de dados

const connection = require("../services/database/databaseConnection");

class FormModel {
  listar() {
    const sql = "SELECT * FROM roomrover.client;";
    return new Promise((resolve, reject) => {
      connection.query(sql, {}, (error, response) => {
        if (error) {
          reject(error);
          return;
        } else {
          console.log("deu certo");
          resolve(response);
        }
      });
    });
  }

  insert(data) {
    const { name, email, phone, birthdate, nationality, gender, password } = data;

    const sql =
      "INSERT INTO `roomrover`.`client` (`name`, `email`, `phone`, `birthdate`, `nationality`, `gender`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?);";

    connection.query(sql, [name, email, phone, birthdate, nationality, gender, password], (error, response) => {
      if (error) {
        console.error("Erro ao inserir:", error);
        return;
      }

      console.log("Inserção realizada com sucesso:", response);
    });
  }

  delete(id){
    const sql = `DELETE FROM roomrover.adress WHERE idadress = ${id}`
    connection.query(sql, {}, (error, response) => {
        if (error) {
          console.error("Erro ao deletar:", error);
          return;
        }
        console.log("Deletou com sucesso:", response);
      });
  }
}

module.exports = FormModel;
