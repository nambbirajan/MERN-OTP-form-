const express = require("express");
const router = express.Router();
const crypto = require("crypto");


const otpStore = {};


router.post("/generate", (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ error: "Mobile number is required." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
  otpStore[mobile] = { otp, createdAt: Date.now() };

  console.log(`Generated OTP for ${mobile}: ${otp}`); 

  res.status(200).json({ message: "OTP generated and sent to mobile." });
});


router.post("/verify", (req, res) => {
  const { mobile, otp } = req.body;

  const record = otpStore[mobile];
  if (!record) {
    return res.status(400).json({ error: "OTP expired or invalid." });
  }

  const isValid = record.otp === otp && Date.now() - record.createdAt <= 300000; 
  if (isValid) {
    delete otpStore[mobile]; 
    return res.status(200).json({ message: "OTP verified successfully." });
  } else {
    return res.status(400).json({ error: "Invalid OTP." });
  }
});

module.exports = router;
