const connection = require("../services/database/databaseConnection");

class FormModel {
  insert() {
    const country = "brasil";
    const adress = "rua tal";
    const city = "cidade tal";
    const zipcode = "934823";

    const sql =
      "INSERT INTO `roomrover`.`adress` (`country`, `adress`, `city`, `zipcode`) VALUES (?, ?, ?, ?);";
    return new Promise((resolve, reject) => {
      connection.query(
        sql,
        [country, adress, city, zipcode],
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            console.log("deu certo");
            resolve(response);
          }
        }
      );
    });
  }
}

module.exports = FormModel;
