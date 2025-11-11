const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      name,
      avatar,
      phoneNumber,
      notificationPreferences,
      about,
      location,
      remindMeTimePreference,
      themePreference,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (name !== undefined) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber || "";
    if (notificationPreferences !== undefined) {
      user.notificationPreferences = Array.isArray(notificationPreferences)
        ? notificationPreferences
        : [notificationPreferences];
    }
    if (about !== undefined) user.about = about || "";
    if (location !== undefined) user.location = location || "";
    if (remindMeTimePreference !== undefined) {
      user.remindMeTimePreference = remindMeTimePreference;
    }
    if (themePreference !== undefined) {
      user.themePreference = themePreference;
    }

    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(req.user._id).select("-password");
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search users by email for autocomplete
exports.searchUsersByEmail = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim().length < 2) {
      return res.json([]);
    }

    const users = await User.find({
      email: { $regex: query.trim(), $options: "i" },
    })
      .select("email name avatar")
      .limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
