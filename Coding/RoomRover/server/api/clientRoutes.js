const { Router } = require("express");
const router = Router();
const formController = require("../controllers/formController");

router.get("/form", async (req, res) => {
  try {
    const response = await formController.insertFormData();
    console.log(response ?? "none");
    res.send(response);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/form/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await formController.deleteFormData(id);
    console.log(response ?? "none");
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
