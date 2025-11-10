# time-to-wish 🎂

A beautiful and interactive birthday reminder application built with the MERN stack. Never miss a birthday again!

## Features

- 🎉 **Birthday Tracking** - Add and manage birthdays with detailed information
- 📅 **Collections** - Organize birthdays into custom collections
- 🔔 **Reminders** - Get notified before birthdays
- 📊 **Analytics Dashboard** - View statistics and insights
- 👤 **User Profiles** - Manage your profile with customizable settings
- 🌓 **Dark/Light Mode** - Beautiful theme with smooth transitions
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Beautiful UI** - Modern, interactive interface with blue theme

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Framer Motion (animations)
- Axios
- React Hot Toast
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary (image uploads)
- Node-cron (scheduled tasks)
- Bcrypt (password hashing)

## Project Structure

```
TimeToWish/
├── backend/
│   ├── config/          # Database and Cloudinary configuration
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Authentication and upload middlewares
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Email and other services
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/     # React Context providers
│   │   ├── pages/       # Page components
│   │   ├── routes/       # Route protection
│   │   └── utils/       # Helper functions and theme
│   └── public/          # Static assets
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chkrishnaa/time-to-whish.git
   cd time-to-whish
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
   
   Start the backend server:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
   
   Start the development server:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## Features in Detail

### Birthday Management
- Add birthdays with name, date, and optional details
- Organize birthdays into collections
- View upcoming birthdays
- Calculate age automatically
- Delete birthdays

### Collections
- Create custom collections
- Add descriptions to collections
- Filter birthdays by collection
- Delete collections

### User Profile
- Update profile information
- Upload profile picture (Cloudinary)
- Set notification preferences
- Configure theme preferences
- Manage account settings

### Analytics
- View birthday statistics
- Track upcoming birthdays
- Monthly birthday insights

## Theme System

The application uses a centralized blue theme system:
- All colors are defined in `frontend/src/index.css` (CSS variables)
- JavaScript constants in `frontend/src/utils/themeColors.js`
- Easy to switch between color themes

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Birthdays
- `GET /api/birthdays/all` - Get all birthdays
- `POST /api/birthdays/add` - Add new birthday
- `GET /api/birthdays/:id` - Get birthday by ID
- `PUT /api/birthdays/:id` - Update birthday
- `DELETE /api/birthdays/:id` - Delete birthday

### Collections
- `GET /api/collections` - Get all collections
- `POST /api/collections` - Create collection
- `GET /api/collections/:id` - Get collection by ID
- `PUT /api/collections/:id` - Update collection
- `DELETE /api/collections/:id` - Delete collection

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Krishnakumar**
- GitHub: [@chkrishnaa](https://github.com/chkrishnaa)

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern web applications
- Built with ❤️ using the MERN stack

---

Made with ❤️ by Krishnakumar
