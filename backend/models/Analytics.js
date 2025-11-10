const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    totalUsers: { type: Number, default: 0 },
    totalBirthdaysAdded: { type: Number, default: 0 },
    birthdaysThisWeek: { type: Number, default: 0 },
    birthdaysPreviousWeek: { type: Number, default: 0 },
    trend: {
      newUsers: { type: Number, default: 0 },
      birthdays: { type: Number, default: 0 },
      activeUsers: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", analyticsSchema);
