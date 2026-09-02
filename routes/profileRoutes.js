const express = require("express");
const {authenticate}=require("../middleware/authMiddleware")
const {getUserProfile}=require("../controllers/profileController");

const router = express.Router();

router.get("/", authenticate, getUserProfile);

// router.get("/",getUserProfile)

module.exports = router;