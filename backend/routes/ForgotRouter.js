const express = require("express");
const ForgotPasswordController = require("../controllers/ForgotPassword.js");

const router = express.Router();

router.post("/email", ForgotPasswordController.sendEmail);
router.post("/otp/:uniqueId", ForgotPasswordController.OTPcode);
router.post("/password/:uniqueId", ForgotPasswordController.ChangePassword);

module.exports = router;
