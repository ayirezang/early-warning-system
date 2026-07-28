# Early Warning System for Student Failure

An early warning system that identifies students at risk of academic failure by analyzing School-Based Assessment (SBA) and exam scores, then uses AI to explain causes and recommend interventions.

# Features

*Risk Identification\*\*: Calculates student performance risk using SBA and exam scores against a 50% threshold
*AI-Powered Insights**: Utilizes Pi Agent to explain likely causes of risk and recommend targeted interventions
\*Full-Stack Application**: Built with Node.js/Express backend and React/Vite frontend
*Secure Authentication\*\*: JWT-based user authentication with role-based access control
*MongoDB Integration\*\*: Persistent storage for student data, assessments, and risk predictions

# Tech Stack

\*Backend:
Node.js with Express.js
MongoDB with Mongoose ODM
Pi Agent (@earendil-works/pi-coding-agent) for AI explanations
JWT for authentication
bcryptjs for password hashing

\*Frontend:
React 19 with React Router DOM
Vite for fast development and building
TailwindCSS for styling
Zustand for state management
Axios for HTTP requests

# Installation

# Prerequisites

Node.js (v18+)
pnpm (v10+)
MongoDB instance
OpenRouter API key (for Pi Agent)

# Setup

1. Clone the repository\*\*
   bash
   git clone https://github.com/ayirezang/early-warning-system
   cd early-warning-system

2. Backend Setup\*\*
   bash
   cd backend
   pnpm install

3. Frontend Setup\*\*
   `bash
   cd ../frontend
   pnpm install

4. Environment Configuration\*\*

   Create a `.env` file in the `backend` directory:
   env
   MONGO_DB=your_mongodb_connection_string
   PORT=3000
   SECRET_KEY=your_jwt_secret_key
   OPENROUTER_API_KEY=your_openrouter_api_key

   Create a `.env` file in the `frontend` directory:
   `env
   VITE_API_URL=http://localhost:3000/api

# Usage

# Development Mode

1. Start the backend\*\*
   bash
   cd backend
   pnpm dev

   The backend will run on `http://localhost:3000`

2. Start the frontend\*\*
   bash
   cd frontend
   pnpm dev

   The frontend will run on `http://localhost:5173`

# Production Build

1. \*Build the frontend\*\*
   bash
   cd frontend
   pnpm build

2. _Start the backend (serves built frontend)_
   `bash
   cd backend
   pnpm start

# API Endpoints

`GET /` : Health check
`POST /api/users/register` : User registration
`POST /api/users/login` : User login
`GET /api/risk/students` : Get at-risk students
`POST /api/risk/analyze` : Analyze student risk
`GET /api/admin/*` : Admin-only routes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

# Contact

Patience Ayirezang
patienceayirezang56@gmail.com

Project Link: [https://github.com/ayirezang/early-warning-system](https://github.com/ayirezang/
early-warning-system)

Live Demo: https://early-warning-system-shk9.onrender.com/
