const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const birthdayRoutes = require("./routes/birthdayRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const cron = require("node-cron");
const Birthday = require("./models/Birthday");
// const User = require("./models/User");
// const { sendBirthdayReminder } = require("./services/emailService");

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

connectDB();

// Set body parser limits for 5MB images (base64 encoding increases size by ~33%)
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is still running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/birthdays", birthdayRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/analytics", analyticsRoutes);

// Schedule a daily job at 09:00 server time to process birthdays happening tomorrow
cron.schedule("0 9 * * *", async () => {
  try {
    console.log("Running daily birthday reminder check...");
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const currentYear = today.getFullYear();

    const birthdays = await Birthday.find({});

    for (const b of birthdays) {
      const birthDate = new Date(b.date);
      const nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
      if (nextBirthday < today) nextBirthday.setFullYear(currentYear + 1);

      const diffDays = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

      if (diffDays === 1 && b.lastNotifiedYear !== currentYear) {
        console.log(`Reminder: ${b.name}'s birthday is tomorrow (${nextBirthday.toDateString()})`);
        // Email sending temporarily disabled
        // Mark as notified
        b.lastNotifiedYear = currentYear;
        await b.save();
      }
    }
    
    console.log("Birthday reminder check completed.");
  } catch (err) {
    console.error("Reminder cron error:", err.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
