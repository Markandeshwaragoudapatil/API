const express=require("express");
const router=express.Router();
const {logoutUser}=require("../controllers/logoutController");
const {authenticate}=require("../middleware/authMiddleware");

router.delete("/",authenticate,logoutUser);

module.exports = router;