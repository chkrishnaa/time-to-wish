const express = require("express");
const router = express.Router();
const {
  addBirthday,
  getAllBirthdays,
  getBirthdayById,
  updateBirthday,
  deleteBirthday,
} = require("../controllers/birthdayController");
const { protect } = require("../middlewares/authMiddleware");

// Routes - all require authentication
router.post("/add", protect, addBirthday);
router.get("/all", protect, getAllBirthdays);
router.get("/:id", protect, getBirthdayById);
router.put("/:id", protect, updateBirthday);
router.delete("/:id", protect, deleteBirthday);

module.exports = router;
