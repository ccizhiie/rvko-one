const express = require("express");
const HomeController = require("../controllers/HomeController.js");

const router = express.Router();

router.post("/:id", HomeController.Home);
router.get("/profil/:id", HomeController.GetProfil);
router.post("/profil/:id", HomeController.PostProfil);

module.exports = router;
