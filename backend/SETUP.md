Backend setup

1) Create a .env file in backend/ with:

PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here

# Email Configuration (for birthday reminders)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=your-email@gmail.com
FRONTEND_URL=http://localhost:5173

2) Install dependencies and run

cd backend
npm install
npm run dev

Notes
- Reminders run daily at 09:00 server time using node-cron.
- Update the time in server.js if you need a different schedule.
- For Gmail, use an App Password (not your regular password). Enable 2FA and generate an App Password in Google Account settings.
- Email notifications will only work if EMAIL_USER and EMAIL_PASSWORD are properly configured.


