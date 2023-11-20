const connection = require("../services/database/databaseConnection");
class formModel {
  listar() {
    const sql = "SELECT * FROM atendiment"
    return this.connection.query();
  }
}

module.exports = formModel();
