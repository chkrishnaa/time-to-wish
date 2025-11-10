const express = require("express");
const {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
} = require("../controllers/collectionController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createCollection);
router.get("/", protect, getAllCollections);
router.get("/:id", protect, getCollectionById);
router.put("/:id", protect, updateCollection);
router.delete("/:id", protect, deleteCollection);

module.exports = router;

