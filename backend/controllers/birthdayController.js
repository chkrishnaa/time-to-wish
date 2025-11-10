const BirthdayInfo = require("../models/Birthday");

// ✅ Add new birthday entry
exports.addBirthday = async (req, res) => {
  try {
    const { name, date, collectionId } = req.body;

    if (!name || !date) {
      return res.status(400).json({ message: "Name and date are required." });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required." });
    }

    if (!collectionId) {
      return res.status(400).json({ message: "Collection ID is required." });
    }

    // Verify collection belongs to user
    const Collection = require("../models/Collection");
    const collection = await Collection.findOne({
      _id: collectionId,
      userId: req.user._id,
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found." });
    }

    const today = new Date();
    const birthDate = new Date(date);

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Calculate remaining time (in days)
    const nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(today.getFullYear());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const remainingTime = Math.ceil(
      (nextBirthday - today) / (1000 * 60 * 60 * 24)
    );

    const newBirthday = new BirthdayInfo({
      name,
      date: birthDate,
      remainingTime,
      age,
      userId: req.user._id,
      collectionId: collectionId,
    });

    await newBirthday.save();
    res
      .status(201)
      .json({ message: "Birthday added successfully!", data: newBirthday });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding birthday", error: error.message });
  }
};

// ✅ Get all birthdays
exports.getAllBirthdays = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required." });
    }

    // Get collectionId from query params if provided
    const { collectionId } = req.query;
    const query = { userId: req.user._id };
    
    if (collectionId) {
      query.collectionId = collectionId;
    }

    const birthdays = await BirthdayInfo.find(query).sort({ date: 1 });
    res.status(200).json(birthdays);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching birthdays", error: error.message });
  }
};

// ✅ Get a single birthday by ID
exports.getBirthdayById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const birthday = await BirthdayInfo.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    
    if (!birthday) {
      return res.status(404).json({ message: "Birthday not found" });
    }
    res.status(200).json(birthday);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching birthday", error: error.message });
  }
};

// ✅ Update birthday info
exports.updateBirthday = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const { name, date } = req.body;
    
    // Verify birthday belongs to user
    const existing = await BirthdayInfo.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!existing) {
      return res.status(404).json({ message: "Birthday not found" });
    }

    const today = new Date();
    const birthDate = new Date(date);

    // Recalculate age and remainingTime
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(today.getFullYear());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const remainingTime = Math.ceil(
      (nextBirthday - today) / (1000 * 60 * 60 * 24)
    );

    const updated = await BirthdayInfo.findByIdAndUpdate(
      req.params.id,
      { name, date: birthDate, remainingTime, age },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Birthday updated successfully!", data: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating birthday", error: error.message });
  }
};

// ✅ Delete a birthday
exports.deleteBirthday = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const deleted = await BirthdayInfo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    
    if (!deleted) {
      return res.status(404).json({ message: "Birthday not found" });
    }
    res.status(200).json({ message: "Birthday deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting birthday", error: error.message });
  }
};
