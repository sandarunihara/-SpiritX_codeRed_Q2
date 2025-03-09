# -SpiritX_CodeRed_Q2
# Spirit11 - Fantasy Cricket Platform

## 📌 Project Overview
Spirit11 is an interactive fantasy cricket league where users can create teams, manage budgets, and compete based on real player performance. This project consists of:
- **Admin Panel**: Manage players, statistics, and system logic.
- **User Interface**: Allow users to create and manage their fantasy teams.

## Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## 🚀 Features Implemented
### 🔹Admin Panel
✅ Player management (CRUD operations, statistics tracking)  
✅ Tournament summary with overall statistics  
✅ Real-time updates for instant data reflection  
✅ Admin-only authentication  

### 🔹User Interface
✅ User authentication (Sign Up/Login)  
✅ Player selection and budget tracking  
✅ Leaderboard with rankings  
✅ Real-time updates for teams and points  
✅ Fully responsive UI  

---

## 🛠️ Instructions to Run the Project
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/SecureConnect.git
cd SecureConnect
```

### 2️⃣ Install Dependencies
#### Frontend Setup (Vite + React)
```sh
cd frontend
npm install
npm run dev
```
Visit `http://localhost:5173/` in your browser.

#### Backend Setup (Express + MongoDB)
```sh
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:5000/`

### 3️⃣ Environment Variables (Create `.env` files)
#### Backend `.env`
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5050
```

---

## 🗄️ Database Setup & Configuration
### 🔹 MongoDB Setup
1. Install MongoDB and start the service.
2. Use the provided **MongoDB dump** to populate sample users.
3. Run the following command to import the database dump:
```sh
mongorestore --uri="your_mongodb_connection_string" --db secureconnect dump/
```

---

## 🤔 Assumptions Made During Development
- Users start with **Rs. 9,000,000** as their initial budget.
- Only authenticated users can select and manage teams.
- The logic for player points and values follows the given formulas (no custom modifications).
- Players can only be selected from the provided dataset.
- The leaderboard updates in real-time based on team performance.

## 🔥 Additional Features
- **Session Management**: Keeps users logged in until they choose to log out.

## How to Contribute
1. Fork the repository.
2. Create a new feature branch.
3. Commit changes and push to your fork.
4. Open a pull request.

## License
This project is licensed under the MIT License.

---
Ready to dominate the leaderboard? 🚀 Start playing Spirit11 now!

