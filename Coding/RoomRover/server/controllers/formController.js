const formModel = require("../models/formModel");

const formModelInstance = new formModel()

class formController {
  insertFormData() {
    formModelInstance.insert();
}
  updateData(id) {
    return formModelInstance.update(id)
  }
}

module.exports = new formController();
