const { Router } = require("express");
const router = Router();
const formController = require("../controllers/formController");

// router.get("/form", (req, res) => {
//   const response = formController.insertFormData();
//   res.send(response);
//   console.log('rota form')
// });
router.post("/form", formController.insertFormData);

router.get("/form/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await formController.updateData(id);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
