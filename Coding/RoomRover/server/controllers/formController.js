const FormModel = require("c:/Users/Camila/Documents/Rep-RoomRover/Coding/RoomRover/server/models/formModel");

const formModelInstance = new FormModel();

class formController {
  async insertFormData(req, res) {
    try {
      const formData = req.body; 
      await FormModel.insertData(formData);
      res.status(201).json({ message: "Dados inseridos com sucesso." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao inserir dados." });
    }
  }
  updateData(id) {
    return formModelInstance.update(id);
  }
}

module.exports = new formController();
