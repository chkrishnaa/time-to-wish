const mongoose = require("mongoose");

const birthdaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  remainingTime: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  lastNotifiedYear: {
    type: Number,
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Birthday", birthdaySchema);

