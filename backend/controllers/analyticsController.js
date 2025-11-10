const User = require("../models/User");
const Birthday = require("../models/Birthday");

const getTrend = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

// =================== PLATFORM ANALYTICS (Admin / Global View) ===================
exports.getPlatformAnalytics = async (req, res) => {
  try {
    const now = new Date();
    const last7Days = new Date(now);
    last7Days.setDate(now.getDate() - 7);
    const previous7Days = new Date(now);
    previous7Days.setDate(now.getDate() - 14);

    // ---- Total users in app ----
    const totalUsers = await User.countDocuments();

    // ---- Total birthdays added ----
    const totalBirthdays = await Birthday.countDocuments();

    // ---- New users added in last 7 days ----
    const newUsersLast7 = await User.countDocuments({
      createdAt: { $gte: last7Days, $lt: now },
    });

    const newUsersPrevious7 = await User.countDocuments({
      createdAt: { $gte: previous7Days, $lt: last7Days },
    });

    const newUserTrend = getTrend(newUsersLast7, newUsersPrevious7);

    // ---- Birthdays that occurred in last 7 days ----
    const birthdaysLast7 = await Birthday.countDocuments({
      createdAt: { $gte: last7Days, $lt: now },
    });

    const birthdaysPrevious7 = await Birthday.countDocuments({
      createdAt: { $gte: previous7Days, $lt: last7Days },
    });

    const birthdayTrend = getTrend(birthdaysLast7, birthdaysPrevious7);

    // ---- Active users (if you track lastLogin) ----
    const activeUsersLast7 = await User.countDocuments({
      lastLogin: { $gte: last7Days, $lt: now },
    });

    const activeUsersPrevious7 = await User.countDocuments({
      lastLogin: { $gte: previous7Days, $lt: last7Days },
    });

    const activeUserTrend = getTrend(activeUsersLast7, activeUsersPrevious7);

    // ---- Recent birthday additions ----
    const recentBirthdays = await Birthday.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email");

    res.json({
      counts: {
        totalUsers,
        totalBirthdays,
        newUsersLast7,
        birthdaysLast7,
        activeUsersLast7,
        trends: {
          newUsers: newUserTrend,
          birthdays: birthdayTrend,
          activeUsers: activeUserTrend,
        },
      },
      data: {
        recentBirthdays,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load Analytics",
      error: error.message,
    });
  }
};
