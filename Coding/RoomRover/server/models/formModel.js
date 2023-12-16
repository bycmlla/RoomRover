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
}

module.exports = FormModel;
