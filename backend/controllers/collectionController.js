const Collection = require("../models/Collection");

// Create a new collection
exports.createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Collection name is required" });
    }

    const collection = await Collection.create({
      name,
      description: description || "",
      userId: req.user._id,
    });

    res.status(201).json({
      message: "Collection created successfully",
      data: collection,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating collection", error: error.message });
  }
};

// Get all collections for the authenticated user
exports.getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching collections", error: error.message });
  }
};

// Get a single collection by ID
exports.getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: "Error fetching collection", error: error.message });
  }
};

// Update a collection
exports.updateCollection = async (req, res) => {
  try {
    const { name, description } = req.body;

    const collection = await Collection.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    if (name) collection.name = name;
    if (description !== undefined) collection.description = description;

    await collection.save();

    res.status(200).json({
      message: "Collection updated successfully",
      data: collection,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating collection", error: error.message });
  }
};

// Delete a collection
exports.deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Delete all birthdays in this collection
    const Birthday = require("../models/Birthday");
    await Birthday.deleteMany({ collectionId: req.params.id });

    await Collection.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting collection", error: error.message });
  }
};

