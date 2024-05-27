const express = require("express");
const TinderController = require("../controllers/TinderController.js");

const router = express.Router();

router.get("/:id", TinderController.GetTinder);
router.post("/:id", TinderController.PostTinder);

module.exports = router;
