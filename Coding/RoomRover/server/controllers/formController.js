const formModel = require("../models/formModel");

const formModelInstance = new formModel()

class formController {
  insertFormData() {
    formModelInstance.insert();
}
  updateData(id) {
    return `update data of ${id}`;
  }

  deleteData(id) {
    return `delete data of ${id}`;
  }
}

module.exports = new formController();
