const connection = require("../services/database/databaseConnection");

class FormModel {
  insert() {

    let details = {
      nome: req
    }


    const country = "alemanha";
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

  update(id) {
    const country = "CANADÁ";
    let sql = `UPDATE \`roomrover\`.\`adress\` SET \`country\` = '${country}' WHERE \`idadress\` = ${id}`;
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, response) => {
        if (error) {
          reject(error);
        } else {
          console.log("atualizou");
          resolve(response);
        }
      });
    });
  }
}

module.exports = FormModel;

//está na branch third, onde deu certo a inserção e o console do angular
//ta retornando correto tambem, com os dados aparecendo no console.
//não lembro se dei commit na main tambem, pq a third é apenas pra guardar
// o ultimo estado que deu certo, no caso, as inserçoes

// server.post("/api/studant/add", (req, res) => {
//   let details = {
//     stname: req.body.stname,
//     course: req.body.course,
//     fee: req.body.fee,
//   }
//   let sql = "INSERT INTO studant SET ?"
//   db.query(sql, details, (error) => {
//     if (error)
//       res.send("error")
//   })
// })