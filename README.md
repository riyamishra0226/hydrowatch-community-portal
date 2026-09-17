💧 HydroWatch – Smart Community Water Management Platform

<div align="center">

A full-stack MERN platform for community-based water-issue reporting, monitoring and participation.










</div>

📌 Overview

HydroWatch is a full-stack web application designed to provide a structured digital workflow for reporting, tracking and managing community water-related issues.

Instead of relying only on informal complaints through calls, messages or disconnected records, HydroWatch provides a centralized platform where community members can submit an issue with supporting information, location and evidence, while authorized administrators can review and manage the report lifecycle.

The platform also extends beyond issue reporting with volunteer management, community campaigns, notifications, contribution rewards, leaderboard functionality, interactive maps and administrative analytics.

The project is developed as an academic project for B.Tech Computer Science & Engineering, 7th Semester, Academic Session 2026–27.

🎯 Project Objectives

Provide centralized reporting of local water-related problems.

Capture structured issue information including category, severity, description and location.

Support image/evidence attachment with reports.

Provide an interactive geographic view of reported issues.

Track reports through a controlled administrative workflow.

Separate user, volunteer and administrator capabilities using role-based access control.

Provide a controlled volunteer application and campaign-management workflow.

Notify users about relevant report and campaign events.

Encourage legitimate community participation through verified rewards and a leaderboard.

Provide database-driven administrative analytics.

✨ Key Features

🔐 Authentication & Authorization

User registration and login

JWT-based authentication

Password hashing with bcrypt

Protected routes

Role-based access control

Roles: User, Volunteer, Admin

Forgot-password workflow

💧 Water-Issue Reporting

Users can report issues such as:

Water leakage

Water pollution

Pipeline damage

Water wastage

Other water-related problems

Reports can contain:

Issue category

Severity

Description

Location

GPS coordinates

Supporting image

📋 Report Management

View submitted reports

View individual report details

Edit reports where permitted

Delete reports according to authorization rules

Administrative report management

Report ownership checks

Controlled status workflow

Typical report lifecycle:

Pending → Under Review → In Progress → Resolved

🗺️ Interactive Map

Location-aware report visualization

Leaflet-based map interface

OpenStreetMap map data

Browser Geolocation API support

Geographic visualization of valid report coordinates

Severity-based report markers

👨‍💼 Admin Dashboard

Administrators can access management and monitoring functions including:

Report management

User management

Volunteer application management

Campaign verification

Campaign management

Operational analytics

Geographic report monitoring

👥 Volunteer Management

Users can apply to become volunteers.

Administrators can review applications.

Applications can be approved or rejected.

Approved users receive the volunteer role.

Volunteer capabilities are separated from regular user and administrator capabilities.

🌱 Campaign Management

Volunteers and administrators can create campaigns.

Volunteer-created campaigns can require administrator verification before publication.

Administrators can verify and publish campaigns.

Users can join verified campaigns.

Campaign participation can be verified before rewards are issued.

🔔 Notifications

The application provides in-app notifications for relevant events such as:

Report status changes

Campaign-related activity

Other supported account/system events

🏆 Rewards & Leaderboard

HydroWatch includes a contribution-based reward mechanism.

Activity

Reward

Submit a report

+5 points

Report moves to Under Review

+5 points

Report becomes Resolved

+10 points

Join a campaign

0 until participation is verified

Verified campaign participation

Campaign-defined reward

Administrative activity

Excluded from community reward accumulation

The community leaderboard focuses on eligible users and volunteers, excluding administrative activity.

📊 Analytics

The administrative dashboard uses current database records rather than fixed demo values to calculate operational statistics such as:

Total reports

Status distribution

Category distribution

Severity distribution

Resolution rate

Average resolution time

Time-based report trends

Charts are rendered using Recharts.

👤 User Profile

View account information

View activity-related information

Access supported rewards and community features

🧱 System Architecture

HydroWatch follows a three-layer client-server architecture:

┌──────────────────────────────────────────────┐
│              PRESENTATION LAYER              │
│ React • Vite • Tailwind CSS • React Router  │
│ Recharts • Leaflet                           │
└──────────────────────┬───────────────────────┘
                       │ REST API / HTTP
┌──────────────────────▼───────────────────────┐
│              APPLICATION LAYER               │
│ Node.js • Express.js                         │
│ JWT • RBAC • Business Logic • Validation    │
│ Reports • Campaigns • Rewards • Analytics   │
└──────────────────────┬───────────────────────┘
                       │ Mongoose
┌──────────────────────▼───────────────────────┐
│                  DATA LAYER                  │
│ MongoDB Atlas                                │
│ Users • Reports • Campaigns • Rewards       │
│ Notifications • Volunteer Applications      │
└──────────────────────────────────────────────┘

🛠️ Technology Stack

Layer / Area

Technologies

Frontend

React, Vite, Tailwind CSS

Routing

React Router

HTTP Client

Axios

Forms

React Hook Form

Validation

Zod

UI / Icons

React Icons, React Hot Toast

Animation

Framer Motion

Charts

Recharts

Maps

Leaflet, OpenStreetMap

Backend

Node.js, Express.js

Database

MongoDB Atlas, Mongoose

Authentication

JWT, bcryptjs

Middleware

CORS, cookie-parser, dotenv

Version Control

Git, GitHub

Frontend Deployment

Vercel

Backend Deployment

Render

📂 Project Structure

hydrowatch-community-portal/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── Campaign.js
│   │   ├── Notification.js
│   │   ├── Report.js
│   │   ├── Reward.js
│   │   ├── User.js
│   │   └── VolunteerApplication.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── campaignRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── reportRoutes.js
│   │   └── rewardRoutes.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validations/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
├── LICENSE
├── README.md
├── SECURITY_NOTES.md
├── UPGRADE_NOTES.md
└── .gitignore

🚀 Getting Started

1. Clone the repository

git clone https://github.com/riyamishra0226/hydrowatch-community-portal.git
cd hydrowatch-community-portal

2. Install backend dependencies

cd backend
npm install

3. Configure backend environment variables

Create backend/.env:

PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret_at_least_32_characters
FRONTEND_URL=http://localhost:5173

Keep .env files private. Never commit database credentials or JWT secrets to GitHub.

4. Start the backend

npm run dev

The backend runs on the configured port, normally:

http://localhost:5000

5. Install frontend dependencies

Open a second terminal:

cd frontend
npm install

6. Configure frontend environment

Create frontend/.env if required by your deployment/local configuration:

VITE_API_URL=http://localhost:5000

7. Start the frontend

npm run dev

The Vite development server will provide the local frontend URL, normally:

http://localhost:5173

🔌 Backend API Groups

The Express backend exposes REST API groups under /api:

/api/auth
/api/reports
/api/campaigns
/api/notifications
/api/rewards

Protected operations require authentication, and administrative/volunteer operations are additionally restricted by role and authorization rules.

🧪 Development & Testing

Before deployment, verify at minimum:

Registration and login

Authentication persistence and logout

Protected routes

Role-based permissions

Report creation and editing

Image upload

GPS/location handling

Report status transitions

Report deletion authorization

Volunteer application workflow

Campaign creation and verification

Campaign participation verification

Reward calculations

Leaderboard filtering

Notifications

Map visualization

Admin analytics

For frontend linting:

cd frontend
npm run lint

For a production frontend build:

npm run build

📸 Screenshots

The repository contains screenshots in the screenshots/ directory.

Home Page

<p align="center">
  <img src="screenshots/ss_homepage.png" width="850" alt="HydroWatch Home Page">
</p>

Login

<p align="center">
  <img src="screenshots/ss_login.png" width="850" alt="HydroWatch Login Page">
</p>

Dashboard

<p align="center">
  <img src="screenshots/ss_dashboard.png" width="850" alt="HydroWatch Dashboard">
</p>

Report Issue

<p align="center">
  <img src="screenshots/ss_Report_Issue.png" width="850" alt="HydroWatch Report Issue Page">
</p>

Campaigns

<p align="center">
  <img src="screenshots/ss_campaigns.png" width="850" alt="HydroWatch Campaigns">
</p>

Leaderboard

<p align="center">
  <img src="screenshots/ss_leaderboard.png" width="850" alt="HydroWatch Leaderboard">
</p>

Profile

<p align="center">
  <img src="screenshots/ss_profile.png" width="850" alt="HydroWatch Profile">
</p>

☁️ Deployment

The project is structured for separate frontend and backend deployment.

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

When deploying, configure the backend CORS origin using FRONTEND_URL and configure the frontend API endpoint using VITE_API_URL according to the deployment environment.

Current deployment

Frontend: https://hydrowatch-community-portal.vercel.app/

Backend: https://hydrowatch-backend.onrender.com/

Deployment URLs may change as the project is updated.

🌍 SDG Alignment

HydroWatch is conceptually aligned with United Nations Sustainable Development Goal 6 (SDG 6): Clean Water and Sanitation by supporting structured reporting, awareness, community participation and digital management of water-related issues.

The application is a software platform; it does not itself perform physical water-infrastructure repair or act as an IoT sensor network.

🔮 Future Scope

The following capabilities can be considered for future versions and are not described as current core functionality:

AI-assisted classification and prioritization of reports

Computer-vision analysis of uploaded evidence images

AI-based duplicate-report detection and report summarization

Predictive analytics for recurring water problems

Real-time IoT/sensor integration

Advanced geospatial heatmaps and risk analysis

Mobile application or Progressive Web App

Push, SMS and email notification integrations

Multilingual interface

Integration with municipal, utility and public-service systems

🔒 Security Notes

Store secrets only in environment variables.

Do not commit .env files.

Use a strong JWT secret of sufficient length.

Keep MongoDB credentials private.

Use backend authorization checks in addition to frontend route protection.

Validate object IDs and user ownership before performing protected operations.

Review SECURITY_NOTES.md before production deployment.

👨‍💻 Project Team

Riya Mishra

B.Tech – Computer Science & Engineering

Roll No.: 2312130100047

GitHub: https://github.com/riyamishra0226

Ansh Pandey

B.Tech – Computer Science & Engineering

Roll No.: 2312130100016

👨‍🏫 Project Guide

Dr. Kaushal Kishor
Department of Computer Science & Engineering
Bharat Ratna Sardar Vallabh Bhai Patel Rajkiya Engineering College Basti

📄 Academic Project Information

Field

Details

Project

HydroWatch – Smart Community Water Management Platform

Programme

B.Tech Computer Science & Engineering

Semester

7th Semester

Academic Session

2026–27

Institution

Bharat Ratna Sardar Vallabh Bhai Patel Rajkiya Engineering College Basti

University

Dr. A.P.J. Abdul Kalam Technical University, U.P., Lucknow

Project Guide

Dr. Kaushal Kishor

Team Members

Riya Mishra, Ansh Pandey

🤝 Contributing

Fork the repository.

Create a feature branch.

Make and test your changes.

Commit the changes with a clear message.

Push the branch.

Open a Pull Request.

For an academic project repository, major architectural or feature changes should also be documented in the relevant project notes.

📜 License

This project is licensed under the MIT License.

See the LICENSE file for details.

<div align="center">

HydroWatch

Smart Community Water Management Platform

Built using the MERN stack.

</div>
