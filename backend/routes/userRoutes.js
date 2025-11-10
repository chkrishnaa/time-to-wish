const express = require("express");
const { getProfile, updateProfile, getPublicProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/:id", protect, getPublicProfile);

module.exports = router;