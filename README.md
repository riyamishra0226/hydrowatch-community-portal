# 💧 HydroWatch – Smart Community Water Management Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-8.1.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3.2-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Mongoose-9.7.4-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose"/>
  <img src="https://img.shields.io/badge/Axios-1.18.1-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  <img src="https://img.shields.io/badge/Recharts-3.9.2-22B5BF?style=for-the-badge" alt="Recharts"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/Project-Final%20Year%20Project-blue?style=flat-square" alt="Project"/>
  <img src="https://img.shields.io/badge/SDG-6%20Clean%20Water%20%26%20Sanitation-4C9F38?style=flat-square" alt="SDG 6"/>
</p>

---

## 📌 Overview

**HydroWatch** is a smart community-based water management platform designed to help citizens report and track water-related issues while enabling administrators and volunteers to coordinate community activities.

The platform provides a centralized system for:

- 💧 Reporting water-related problems
- 🗺️ Locating issues on an interactive map
- 🔎 Tracking report status
- 👨‍💼 Managing reports through an admin dashboard
- 🤝 Managing volunteers and community campaigns
- 🏆 Rewarding community participation
- 📊 Visualizing water-management analytics
- 🔔 Sending notifications
- 👥 Building community participation through a leaderboard

HydroWatch follows a role-based architecture with three major roles:

**User → Volunteer → Admin**

---

# 🎯 Project Objectives

The primary objectives of HydroWatch are:

1. Provide citizens with an easy way to report water-related issues.
2. Allow users to attach issue details, images, and locations.
3. Enable administrators to review and manage submitted reports.
4. Introduce a structured report-status workflow.
5. Encourage community participation through rewards.
6. Allow volunteers to organize verified water-awareness campaigns.
7. Provide administrators with analytics and management tools.
8. Display water-related issues geographically using an interactive map.
9. Improve communication using notifications.
10. Support community participation toward **SDG 6 – Clean Water and Sanitation**.

---

# ✨ Key Features

## 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes
- Role-based access control
- User / Volunteer / Admin roles
- Forgot-password functionality
- Secure API authorization

---

## 💧 Water Issue Reporting

Users can report different types of water-related problems.

### Supported issue categories

- Water Leakage
- Water Pollution
- Pipeline Damage
- Water Wastage
- Other Water Issues

Each report can contain:

- Issue category
- Severity
- Description
- Location
- Latitude / Longitude
- Uploaded image
- Report status
- Submission timestamp

---

# 🗺️ Interactive Map

HydroWatch provides an interactive map for displaying issue locations.

The map functionality uses:

- Leaflet
- OpenStreetMap
- Browser Geolocation API
- Latitude and Longitude coordinates

Users can use their current location while submitting reports.

Administrators can also view reported issues geographically.

---

# 🔄 Report Status Workflow

Reports follow a structured lifecycle:

```text
┌───────────┐
│  Pending  │
└─────┬─────┘
      ↓
┌────────────────┐
│  Under Review  │
└───────┬────────┘
        ↓
┌────────────────┐
│  In Progress   │
└───────┬────────┘
        ↓
┌───────────────┐
│   Resolved    │
└───────────────┘
