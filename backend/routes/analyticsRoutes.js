const express = require("express");
const { getPlatformAnalytics } = require("../controllers/analyticsController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Platform-wide analytics (admin or user dashboard)
router.get("/platform", protect, getPlatformAnalytics);

module.exports = router;
