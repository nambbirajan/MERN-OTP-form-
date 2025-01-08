const express = require("express");
const router = express.Router();
const FormData = require("../models/userModels");

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const formData = new FormData({ name, email, password });
    await formData.save();
    res.status(201).json({ message: "Form data saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save form data" });
  }
});


router.get("/", async (req, res) => {
  try {
    const data = await FormData.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch form data" });
  }
});

module.exports = router;
