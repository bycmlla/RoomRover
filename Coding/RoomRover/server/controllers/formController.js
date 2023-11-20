class formController {
  insertFormData() {
    return "inserindo dados";
  }
  updateData(id) {
    return `update data of ${id}`;
  }

  deleteData(id) {
    return `delete data of ${id}`;
  }
}

module.exports = new formController();
