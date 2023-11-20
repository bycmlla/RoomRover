const { Router } = require("express");
const router = Router();
const formController = require("../controllers/formController");

router.get("/form", (req, res) => {
  const response = formController.insertFormData();
  res.send(response);
});

router.post("/form", (req, res) => {
  const response = formController.updateData();
  res.send(response);
});

router.get("/form/:id", (req, res) => {
  const { id } = req.params;
  const response = formController.deleteData(id);
  res.send(response);
});

module.exports = router;
