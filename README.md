# BlogHub: Full-Stack Developer Blog Portal

> A next-generation, high-performance, and visually stunning Full-Stack Blogging Platform. Designed with a premium tech-themed dark aesthetic, this application features a **Next.js (App Router)** client powered by **Redux Toolkit** for seamless state management, and a robust **Express.js & Node.js REST API** backed by **MongoDB & Mongoose** with automated connection resiliency, alongside **Cloudinary** integration for optimized cloud media delivery.

---

## 🎥 Demonstration & Repository

| Resource | Link |
|---|---|
| 🎥 Live Demo Video | Watch Walkthrough *(Link your Video here)* |
| 💻 Source Code | [GitHub Repository](https://github.com/sindhavdinesh/Blog-hub-project) |

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [System Architecture](#️-system-architecture)
- [Tech Stack](#️-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Installation & Local Setup](#-installation--local-setup)
- [API Reference Endpoints](#-api-reference-endpoints)
- [Key Functionalities Checklist](#-key-functionalities-checklist)
- [Engineering Concept Learnings](#-engineering-concept-learnings)
- [Developer Contact](#-developer)

---

## 🌟 About the Project

**BlogHub** is a production-ready, full-stack blogging system engineered for modern web speeds and absolute reliability. Unlike basic front-end setups, BlogHub integrates a dedicated custom backend server with persistent storage.

### Core Design Philosophy

- **User Experience First:** Utilizing smooth micro-animations, glassmorphism UI elements, and a responsive layout that adapts to mobile, tablet, and desktop viewports.
- **Visual Continuity:** Avoids layout shifts (CLS) by utilizing modern CSS properties like `aspect-ratio` on all dynamic image grids and cover views.
- **Data Integrity:** Equipped with fully client-side and server-side model validation, and resilient MongoDB Atlas reconnection logic that handles network drops gracefully.

---

## 🚀 Key Features

### 📂 Advanced Blog CRUD Operations
- **Create:** Fully-validated forms with cover image upload support, auto-generating blog metadata.
- **Read:** Rich single-page layouts displaying blog content, author details, formatting-preserved text, tags, and category info.
- **Update:** Pre-populated editing interfaces that update the UI instantly upon database write confirmation.
- **Delete:** Secure deletion with instant state synchronization in Redux Store.

### 🔍 Real-Time Search & Filtering
- **Instant Keyword Search:** Fast client-side searching matching keywords in blog titles and descriptions.
- **Dynamic Category Tabs:** Instantly filter posts between different categories *(Tech, Lifestyle, Business, Travel, Food, Other)*.
- **Multi-Criteria Sorting:**
  - 🆕 Newest First *(Default)*
  - 🕰️ Oldest First
  - 🔤 Alphabetical A–Z
  - 🔡 Reverse Alphabetical Z–A

### ☁️ Cloudinary Media Pipeline
- Drag-and-drop or select an image file to upload it directly to **Cloudinary Media Cloud**.
- Secure URLs are stored in MongoDB.
- Interactive real-time image preview container before posting/updating.

### 🛠️ Robust Database Connector
- Mongoose connection setup with built-in custom DNS fallback servers (`8.8.8.8`).
- Handles server selection timeouts and automatically reconnects in intervals without crashing the Node.js server.

---

## ⚙️ System Architecture

```
┌────────────────┐          HTTP Request          ┌─────────────────┐
│                ├───────────────────────────────>│                 │
│  Next.js App   │        Redux Async Thunk       │  Express Server │
│   (Port 3000)  │                                │   (Port 5000)   │
│                │<───────────────────────────────┤                 │
└──────┬─────────┘          JSON Response         └────────┬────────┘
       │                                                   │
       │ Manage State                                      ├───────────────> Cloudinary API
       ▼                                                   │ (Secure Image Uploads)
┌──────────────┐                                           ▼
│ Redux Store  │                                  ┌─────────────────┐
│ (Global)     │                                  │  MongoDB Atlas  │
└──────────────┘                                  │ (Data Store)    │
                                                  └─────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend & Styling

| Technology | Version | Purpose |
|---|---|---|
| **Next.js 16** | v16.2.9 | React framework leveraging App Router, Server Components, and Layout optimization. |
| **React 19** | v19.2.4 | Component-based UI logic and state lifecycles. |
| **Redux Toolkit** | v2.12.0 | Global state management to slice and sync blog data across components. |
| **Tailwind CSS v4** | v4.0.0 | Next-gen utility-first styling for quick, consistent UI structure. |
| **CSS Modules** | Native | Clean scoped styling for forms, home pages, and cards, avoiding class pollution. |
| **Lucide React** | v1.20.0 | Lightweight and customizable vector icons. |

### Backend & Database

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | v18+ | Runtime environment for the backend server. |
| **Express.js** | v4.19.2 | REST API framework handling CORS, JSON parsing, and server routing. |
| **Mongoose** | v9.7.0 | Schema-based modeling and validation for MongoDB documents. |
| **MongoDB Atlas** | Cloud | Cloud database service for storing posts, categories, and author details. |
| **Cloudinary** | v2.10.0 | Image hosting, storage, and optimization CDN. |
| **Multer** | v1.4.5 | Middleware for uploading image files to server memory. |
| **Concurrently** | v8.2.2 | Runs both frontend client and backend Express server concurrently under a single port wrapper. |

---

## 📁 Project Directory Structure

```
blog-project/
├── config/                   # Backend configurations
│   ├── db.js                 # MongoDB connection and retry logic
│   └── cloudinary.js         # Cloudinary SDK credentials
├── models/                   # Database Schema Models
│   └── Blog.js               # Mongoose Blog Schema and Validation rules
├── routes/                   # Express REST API Routes
│   ├── blogRoutes.js         # REST endpoints for Blog CRUD
│   └── uploadRoutes.js       # Image upload controller
├── public/                   # Static local assets (SVGs, icons)
├── src/                      # Next.js Source Code
│   ├── app/                  # App Router Layouts & Pages
│   │   ├── blog/             # Dynamic Sub-pages
│   │   │   ├── create/       # New Post Creation Page
│   │   │   ├── edit/         # Edit Post Page
│   │   │   └── [id]/         # Detailed Blog View
│   │   ├── layout.js         # Main layout wrap
│   │   ├── page.js           # Client-side home portal with filters
│   │   └── StoreProvider.js  # Redux Toolkit global wrapper
│   ├── Components/           # Modular & Reusable Components
│   │   ├── BlogCard/         # Grid items & Featured Post banner
│   │   ├── BlogDetails/      # Full post detail template
│   │   ├── CreateBlogForm/   # Form validation for new posts
│   │   ├── UpdatePostForm/   # Prefilled form update logic
│   │   ├── Filtering/        # Interactive Search/Category/Sort panel
│   │   └── Common/           # Navbar, Header components
│   ├── redux/                # Global Redux State Setup
│   │   ├── action/           # Async API Thunks
│   │   ├── slice/            # State reducers (fetch, delete, create)
│   │   └── store.js          # Configured Redux Store
│   ├── styles/               # Glassmorphism theme CSS Modules
│   │   ├── BlogDetail.module.css
│   │   ├── Form.module.css
│   │   └── Home.module.css
│   └── utils/                # Client-side helpers
│       └── validateForm.js   # Regex and required-field validators
├── server.js                 # Express API entry point
├── package.json              # Node scripts and dev dependencies
└── .env                      # Environment secrets (Git ignored)
```

---

## 🔧 Installation & Local Setup

Follow these simple steps to run this full-stack project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/sindhavdinesh/Blog-hub-project.git
cd Blog-hub-project
```

### 2. Install Project Dependencies
This installs both frontend client-side libraries and backend Express libraries:
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root folder of the project:
```env
# Server
PORT=5000

# MongoDB Connection String (Atlas or Local)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blogdb?retryWrites=true&w=majority

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Launch the Dev Environment
We run both servers concurrently using:
```bash
npm run dev
```

| Service | URL |
|---|---|
| 🌐 Frontend Web Client | http://localhost:3000 |
| ⚙️ Backend REST API | http://localhost:5000 |

---

## 📡 API Reference Endpoints

All backend routes are exposed under `/api/*`:

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `GET` | `/api/blogs` | Retrieves all blog posts with search/sorting params | None |
| `GET` | `/api/blogs/:id` | Retrieves a single blog post by its MongoDB ObjectId | None |
| `POST` | `/api/blogs` | Inserts a new blog into the database | `{ title, description, category, author, image }` |
| `PUT` | `/api/blogs/:id` | Modifies an existing blog post | `{ title, description, category, author, image }` |
| `DELETE` | `/api/blogs/:id` | Permanently deletes a post | None |
| `POST` | `/api/upload` | Uploads raw image file to Cloudinary | `multipart/form-data` with `image` key |

---

## 🎯 Key Functionalities Checklist

| Feature | Status | Technology Used |
|---|---|---|
| Full CRUD Cycle | ✅ Done | Express, Mongoose, Redux Thunks |
| State Syncing | ✅ Done | Redux Toolkit slice architecture |
| Robust Database Connection | ✅ Done | Mongoose reconnect listeners |
| Real-time Title Search | ✅ Done | Redux Filter query parameters |
| Category Categorization | ✅ Done | Interactive filter state handlers |
| Custom Sorters | ✅ Done | MongoDB sort queries & JS local fallbacks |
| Image Upload API | ✅ Done | Cloudinary Cloud & Multer memory storage |
| Client Form Validation | ✅ Done | Helper utility functions |
| Aspect Ratio Sizing | ✅ Done | CSS `aspect-ratio` properties |

---

## 📚 Engineering Concept Learnings

Building this application provided deep practical experience in:

- **Next.js File Routing:** Leveraging the folder-based page structure (`app/blog/[id]/page.js`) for dynamic routing.
- **Express & Next.js Integration:** Handling cross-origin requests (CORS) between `http://localhost:3000` (Frontend) and `http://localhost:5000` (Backend API).
- **Robust Mongoose Connectivity:** Designing custom event listeners (`on('disconnected')`, `on('error')`) to prevent API server drops during minor internet connection hiccups.
- **Global State Management:** Setting up slice states, async actions via Redux Thunk, and using `useSelector` and `useDispatch` hooks to maintain data consistency.
- **Layout Stability & Styling:** Using `aspect-ratio` on image wrappers to allocate page dimensions beforehand, neutralizing layout shifts (CLS) for a premium responsive UI experience.
- **Cloudinary Media Pipeline:** Converting file binaries to data chunks, routing them to CDN folders, and resolving them into optimized cloud URLs.

---

## 👨‍💻 Developer

**Sindhav Dinesh**
*Full-Stack Developer / Frontend Engineer*

[![GitHub](https://img.shields.io/badge/GitHub-sindhavdinesh-181717?style=for-the-badge&logo=github)](https://github.com/sindhavdinesh)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/sindhavdinesh)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF5722?style=for-the-badge&logo=google-chrome)](https://sindhavdinesh.dev)

---

## ⭐ Support & Contributions

If you like this project or find it helpful:

- Give a ⭐ to this repository on GitHub.
- Fork it and build your own customization.
- Share it with your peers!

---

<div align="center">
  <strong>Made with ❤️ by Sindhav Dinesh</strong>
</div>
