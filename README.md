# Payments-App

A full-stack web application inspired by Paytm, built with Node.js (Express) for the backend and React (Vite) for the frontend. This project demonstrates user authentication, account management, and money transfer features.

## Features
- User signup and signin
- Dashboard with account balance
- Send money to other users
- Responsive UI
- RESTful API backend

## Tech Stack
- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB,AivenDB,etc.
- **Docker:** Containerized setup

## Getting Started

### Prerequisites
- Node.js & npm

### Installation

1. **Clone the repository:**
   ```powershell
   git clone <repo-url>
   cd paytm-app
   ```

2. **Install dependencies:**
   - Backend:
     ```powershell
     cd backend
     npm install
     ```
   - Frontend:
     ```powershell
     cd ../frontend
     npm install
     ```

3. **Configure environment variables:**
   - Add your DB connection string and secrets in `backend/config.js`.

4. **Run the app:**
   - Backend:
     ```powershell
     cd backend
     npm start
     ```
   - Frontend:
     ```powershell
     cd frontend
     npm run dev
     ```

5. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:3000](http://localhost:3000)

### Docker (Optional)
To run both frontend and backend using Docker:
```powershell
docker build -t paytm-app .
docker run -p 3000:3000 -p 5173:5173 paytm-app
```
