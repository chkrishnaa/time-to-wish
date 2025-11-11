import { Bell, Heart, Calendar, User, Gift, Settings, Upload, Moon, Cloud, BarChart, LayoutGrid, UserCircle } from "lucide-react";

export const birthdayFeatures = [
  {
    title: "Upcoming Birthday Reminders",
    subtitle: "Stay ahead of every celebration",
    description:
      "Never forget a friend's special day! Get automatic notifications a few days before each birthday. Plan ahead and make every birthday memorable.",
    icon: Bell,
  },
  {
    title: "Personalized Wishes",
    subtitle: "Send love your way, effortlessly",
    description:
      "Send heartfelt messages with ease. Store custom birthday wishes or notes for each person. Make your greetings more personal and meaningful.",
    icon: Heart,
  },
  {
    title: "Birthday Calendar View",
    subtitle: "Your month at a glance",
    description:
      "Visualize all birthdays in a clean calendar layout. Quickly see who's coming up next. Organize celebrations without missing any dates.",
    icon: Calendar,
  },
  {
    title: "Age Tracker",
    subtitle: "See milestones at a glance",
    description:
      "Automatically calculates the current age of your friends. No need to manually update every year. Perfect for remembering milestones and special occasions.",
    icon: User,
  },
  {
    title: "Gift & Notes Manager",
    subtitle: "Never run out of thoughtful ideas",
    description:
      "Keep a list of gift ideas or special notes for each person. Easily plan gifts ahead of time. Never run out of thoughtful surprises.",
    icon: Gift,
  },
  {
    title: "Customizable Notifications",
    subtitle: "Control how you get reminded",
    description:
      "Choose when and how you receive alerts. Set reminders via app notification, email, or SMS. Full control over your birthday alert preferences.",
    icon: Settings,
  },
  {
    title: "Import Contacts",
    subtitle: "Add birthdays in one tap",
    description:
      "Easily import birthdays directly from your phone contacts or social media. Save time and ensure your list is always up to date.",
    icon: Upload,
  },
  {
    title: "Dark & Light Theme",
    subtitle: "Match your mood, day or night",
    description:
      "Switch between light and dark mode for a comfortable viewing experience anytime. Personalize the app appearance to your style.",
    icon: Moon,
  },
  {
    title: "Data Backup & Sync",
    subtitle: "Your birthdays, always safe",
    description:
      "Securely back up all your birthday data to the cloud. Sync seamlessly across multiple devices to never lose important dates.",
    icon: Cloud,
  },
  {
    title: "Analytics Dashboard",
    subtitle: "Insights that help you plan better",
    description:
      "Get insights into monthly birthdays, upcoming celebrations, and most active months. A fun way to stay organized and plan ahead.",
    icon: BarChart,
  },
];

export const NAVIGATION_MENU = [
  {
    id: "dashboard",
    name: "Collections",
    icon: LayoutGrid
  },
  {
    id: "birthdays",
    name: "Birthdays",
    icon: Calendar
  },
  {
    id: "profile",
    name: "Profile Settings",
    icon: UserCircle
  },
];
