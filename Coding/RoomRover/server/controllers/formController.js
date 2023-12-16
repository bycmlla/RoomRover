const formModel = require("../models/formModel");

const formModelInstance = new formModel();

class formController {
  
  async insertFormData() {
    try {
      const response = await formModelInstance.insert();
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async showFormData() {
    try {
      const response = await formModelInstance.listar();
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async deleteFormData(id) {
    try {
      const response = await formModelInstance.delete(id);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new formController();
