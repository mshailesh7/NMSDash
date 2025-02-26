# NMS Dashboard

A modern dashboard built with Vite, React, TailwindCSS, and MongoDB.

## Project Structure

```
.
├── frontend/           # React + Vite frontend
│   ├── src/           # React source files
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
├── backend/           # Express.js backend
│   ├── index.js      # Main server file
│   └── package.json   # Backend dependencies
└── package.json       # Root package.json for project management
```

## Tech Stack

- Frontend: React + Vite
- Styling: TailwindCSS
- Backend: Express.js
- Database: MongoDB

## Setup Instructions

1. Install all dependencies:
   ```bash
   npm run install:all
   ```

2. Start the development servers:
   ```bash
   # Start both frontend and backend
   npm run dev

   # Or start them separately:
   npm run frontend:dev  # Start frontend only
   npm run backend:dev   # Start backend only
   ```

3. Make sure MongoDB is running locally or update the MONGODB_URI in backend/.env

## Environment Variables

Create `.env` files in both frontend and backend directories:

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nmsdashboard
```

## Available Scripts

- `npm run install:all`: Install all dependencies
- `npm run dev`: Start both frontend and backend in development mode
- `npm run frontend:dev`: Start frontend development server
- `npm run backend:dev`: Start backend development server
- `npm run frontend:build`: Build the frontend for production
