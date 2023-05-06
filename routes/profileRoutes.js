const express = require("express");
const {updateProfile, getProfile} = require("../controllers/profileController");
const  verifyToken  = require("../middlewares/verifyToken");

const router = express.Router();

//update Profile
router.post("/home/profile", verifyToken, updateProfile);

//get profile
router.get("/home/profile", verifyToken, getProfile);

//Exporting Modules
module.exports = router;
