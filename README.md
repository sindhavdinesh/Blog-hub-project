<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=0d0221&height=280&section=header&text=BlogHub&fontSize=100&fontColor=c084fc&animation=twinkling&fontAlignY=45&stroke=7c3aed&strokeWidth=3&desc=⚡%20Full-Stack%20Developer%20Blog%20Portal%20⚡&descAlignY=68&descSize=22&descColor=a78bfa" width="100%"/>

<br/>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=800&size=22&pause=1000&color=C084FC&center=true&vCenter=true&width=800&height=55&lines=%F0%9F%9A%80+Next.js+16+%7C+Express.js+%7C+MongoDB+Atlas;%E2%98%81%EF%B8%8F+Cloudinary+Media+Pipeline+Integration;%F0%9F%94%B4+Redux+Toolkit+Global+State+Management;%E2%9A%A1+Production-Ready+Full-Stack+Architecture;%F0%9F%8E%A8+Glassmorphism+Dark+Premium+UI+Design" alt="Typing SVG" />
</a>

<br/><br/>

<img src="https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js&logoColor=white&labelColor=0d0221"/>
&nbsp;
<img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black&labelColor=0d0221"/>
&nbsp;
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=0d0221"/>
&nbsp;
<img src="https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white&labelColor=0d0221"/>

<br/><br/>

<img src="https://img.shields.io/badge/Status-Production_Ready-c084fc?style=for-the-badge&labelColor=0d0221"/>
&nbsp;
<img src="https://img.shields.io/badge/License-MIT-7c3aed?style=for-the-badge&labelColor=0d0221"/>
&nbsp;
<img src="https://img.shields.io/github/stars/sindhavdinesh/Blog-hub-project?style=for-the-badge&color=c084fc&labelColor=0d0221&logo=github"/>
&nbsp;
<img src="https://img.shields.io/badge/Made_with-❤️_by_Sindhav_Dinesh-a855f7?style=for-the-badge&labelColor=0d0221"/>

</div>

---

<div align="center">

> **BlogHub** is a next-generation, high-performance, and visually stunning Full-Stack Blogging Platform.  
> Designed with a premium tech-themed dark aesthetic — featuring **Next.js App Router**, **Redux Toolkit**, **Express.js REST API**, **MongoDB Atlas**, and **Cloudinary** CDN integration.

</div>

---
## 🎥 Demo & Repository

<div align="center">

| 🚀 Resource | 🔗 Link |
|:---:|:---:|
| 🎥 **Live Demo Video** | [▶️ Watch Walkthrough](https://drive.google.com/file/d/1HCQyU0RFySg8tNzIWPsbp79WDb0T9aIh/view?usp=sharing) |
| 💻 **Source Code** | [GitHub Repository](https://github.com/sindhavdinesh/Blog-hub-project) |
| 🌐 **Live Site** | [Visit BlogHub](#) |

</div>

---

## 📋 Table of Contents

<div align="center">

| | |
|:---|:---|
| [🌟 About the Project](#-about-the-project) | [📁 Directory Structure](#-project-directory-structure) |
| [🚀 Key Features](#-key-features) | [🔧 Installation & Setup](#-installation--local-setup) |
| [⚙️ System Architecture](#️-system-architecture) | [📡 API Reference](#-api-reference-endpoints) |
| [🛠️ Tech Stack](#️-tech-stack) | [🎯 Functionalities Checklist](#-key-functionalities-checklist) |
| [📚 Engineering Learnings](#-engineering-concept-learnings) | [👨‍💻 Developer](#-developer) |

</div>

---

## 🌟 About the Project

```bash
$ cat about.json
```

```json
{
  "project": "BlogHub",
  "type": "Full-Stack Web Application",
  "status": "Production Ready ✅",
  "frontend": "Next.js 16 + Redux Toolkit",
  "backend": "Express.js + Node.js REST API",
  "database": "MongoDB Atlas + Mongoose",
  "media": "Cloudinary CDN",
  "ui_theme": "Glassmorphism Dark Premium",
  "architecture": "Client-Server Decoupled"
}
```

### 🧠 Core Design Philosophy

<div align="center">

| 🎯 Principle | 💡 Implementation |
|:---|:---|
| **User Experience First** | Smooth micro-animations, glassmorphism UI, fully responsive mobile → desktop layout |
| **Visual Continuity** | Avoids CLS using `aspect-ratio` on all dynamic image grids and cover views |
| **Data Integrity** | Client-side + server-side validation with resilient MongoDB Atlas auto-reconnect logic |

</div>

---

## 🚀 Key Features

<details>
<summary><b>📂 Advanced Blog CRUD Operations</b></summary>
<br/>

- ✅ **Create** — Fully-validated forms with cover image upload, auto-generating blog metadata
- ✅ **Read** — Rich single-page layouts with author details, formatted content, tags & category info
- ✅ **Update** — Pre-populated editing interfaces with instant UI refresh on DB write confirmation
- ✅ **Delete** — Secure deletion with instant Redux Store state synchronization

</details>

<details>
<summary><b>🔍 Real-Time Search & Filtering</b></summary>
<br/>

- ⚡ **Instant Keyword Search** — Fast client-side matching in blog titles and descriptions
- 🗂️ **Dynamic Category Tabs** — Filter between `Tech` · `Lifestyle` · `Business` · `Travel` · `Food` · `Other`
- 🔀 **Multi-Criteria Sorting:**
  - 🆕 Newest First *(Default)*
  - 🕰️ Oldest First
  - 🔤 Alphabetical A–Z
  - 🔡 Reverse Alphabetical Z–A

</details>

<details>
<summary><b>☁️ Cloudinary Media Pipeline</b></summary>
<br/>

- 📤 Drag-and-drop or select image to upload directly to **Cloudinary Media Cloud**
- 🔐 Secure CDN URLs stored in MongoDB
- 🖼️ Real-time image preview before posting or updating

</details>

<details>
<summary><b>🛡️ Robust Database Connector</b></summary>
<br/>

- 🌐 Mongoose connection with custom DNS fallback servers (`8.8.8.8`)
- 🔁 Handles timeouts and auto-reconnects without crashing the Node.js server
- 🎧 Custom `on('disconnected')` and `on('error')` event listeners

</details>

---

## ⚙️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│                                                                     │
│   ┌────────────────┐          HTTP/REST          ┌───────────────┐  │
│   │                ├────────────────────────────>│               │  │
│   │  Next.js App   │      Redux Async Thunk      │ Express REST  │  │
│   │  (Port 3000)   │                             │ (Port  5000)  │  │
│   │                │<────────────────────────────┤               │  │
│   └──────┬─────────┘       JSON Response         └───────┬───────┘  │
│          │                                               │           │
│          │ useSelector                                   │           │
│          ▼ useDispatch                                   │           │
│   ┌──────────────┐                         ┌────────────▼──────────┐ │
│   │ Redux Store  │                         │   Cloudinary API      │ │
│   │  (Global)    │                         │  (Image CDN Upload)   │ │
│   └──────────────┘                         └───────────────────────┘ │
│                                                       │              │
│                                            ┌──────────▼────────────┐ │
│                                            │    MongoDB Atlas      │ │
│                                            │    (Data Store)       │ │
│                                            └───────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### 🎨 Frontend & Styling

<div align="center">

<img src="https://skillicons.dev/icons?i=nextjs,react,redux,tailwind,css&theme=dark"/>

| Technology | Version | Purpose |
|:---|:---:|:---|
| **Next.js 16** | `v16.2.9` | App Router, Server Components, Layout optimization |
| **React 19** | `v19.2.4` | Component UI logic and state lifecycles |
| **Redux Toolkit** | `v2.12.0` | Global state management across all components |
| **Tailwind CSS v4** | `v4.0.0` | Utility-first styling for rapid, consistent UI |
| **CSS Modules** | Native | Scoped component styling, zero class pollution |
| **Lucide React** | `v1.20.0` | Lightweight customizable vector icons |

</div>

### ⚙️ Backend & Database

<div align="center">

<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,cloudinary&theme=dark"/>

| Technology | Version | Purpose |
|:---|:---:|:---|
| **Node.js** | `v18+` | Backend runtime environment |
| **Express.js** | `v4.19.2` | REST API: CORS, JSON parsing, routing |
| **Mongoose** | `v9.7.0` | Schema-based MongoDB document modeling |
| **MongoDB Atlas** | Cloud | Cloud-hosted database for all blog data |
| **Cloudinary** | `v2.10.0` | Image hosting, CDN delivery, optimization |
| **Multer** | `v1.4.5` | Image file upload middleware |
| **JSON Server** | `v1.0.0` | Mock REST API for local development and frontend testing |
| **Concurrently** | `v8.2.2` | Runs frontend + backend together in one command |

</div>

### 🛠️ Dev Tools

<div align="center">
<img src="https://skillicons.dev/icons?i=git,github,vscode&theme=dark"/>
</div>

---

## 📁 Project Directory Structure

```
📦 blog-project/
│
├── 🗂️  config/
│   ├── 🔌 db.js                    # MongoDB connection + retry logic
│   └── ☁️  cloudinary.js            # Cloudinary SDK credentials
│
├── 🗂️  models/
│   └── 📄 Blog.js                  # Mongoose Blog Schema + Validation
│
├── 🗂️  routes/
│   ├── 🔀 blogRoutes.js            # REST endpoints: Blog CRUD
│   └── 📤 uploadRoutes.js          # Image upload controller
│
├── 🗂️  public/                     # Static assets (SVGs, icons)
│
├── 🗂️  src/
│   ├── 🗂️  app/                    # App Router Layouts & Pages
│   │   ├── 🗂️  blog/
│   │   │   ├── 📝 create/          # New Post Creation Page
│   │   │   ├── ✏️  edit/[id]/       # Edit Post Page
│   │   │   └── 👁️  [id]/            # Detailed Blog View
│   │   ├── 🏠 layout.js            # Root layout wrapper
│   │   ├── 📋 page.js              # Home portal with filters
│   │   └── 🔄 StoreProvider.js     # Redux global wrapper
│   │
│   ├── 🗂️  Components/
│   │   ├── 🃏 BlogCard/            # Grid items & Featured banner
│   │   ├── 📖 BlogDetails/         # Full post detail template
│   │   ├── ➕ CreateBlogForm/      # New post form + validation
│   │   ├── ✏️  UpdatePostForm/      # Prefilled edit form
│   │   ├── 🔍 Filtering/           # Search / Category / Sort UI
│   │   └── 🧩 Common/             # Header, Navbar
│   │
│   ├── 🗂️  redux/
│   │   ├── ⚡ action/              # Async API Thunks
│   │   ├── 🔪 slice/               # State reducers
│   │   └── 🏪 store.js             # Redux Store config
│   │
│   ├── 🗂️  styles/
│   │   ├── 🎨 BlogDetail.module.css
│   │   ├── 🎨 Form.module.css
│   │   └── 🎨 Home.module.css
│   │
│   └── 🗂️  utils/
│       └── ✅ validateForm.js      # Regex + required-field validators
│
├── 🚀 server.js                    # Express API entry point
├── 📦 package.json                 # Scripts + dependencies
└── 🔒 .env                         # Environment secrets (Git ignored)
```

---

## 🔧 Installation & Local Setup

### Step 1 — Clone the Repository

```bash
git clone https://github.com/sindhavdinesh/Blog-hub-project.git
cd Blog-hub-project
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Configure Environment Variables

Create a `.env` file in the root:

```env
# ── Server ──────────────────────────────
PORT=5000

# ── MongoDB Atlas ────────────────────────
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blogdb?retryWrites=true&w=majority

# ── Cloudinary ───────────────────────────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ── Frontend ─────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 4 — Launch Dev Environment

```bash
npm run dev
```

<div align="center">

| 🌐 Service | 🔗 URL |
|:---:|:---:|
| Frontend Client | `http://localhost:3000` |
| Backend REST API | `http://localhost:5000` |

</div>

---

## 📡 API Reference Endpoints

<div align="center">

All routes are prefixed with `/api/`

| Method | Endpoint | Description | Body |
|:---:|:---|:---|:---|
| ![GET](https://img.shields.io/badge/GET-47A248?style=flat-square) | `/api/blogs` | Get all blog posts | — |
| ![GET](https://img.shields.io/badge/GET-47A248?style=flat-square) | `/api/blogs/:id` | Get single blog by ID | — |
| ![POST](https://img.shields.io/badge/POST-3448C5?style=flat-square) | `/api/blogs` | Create new blog post | `{ title, description, category, author, image }` |
| ![PUT](https://img.shields.io/badge/PUT-f59e0b?style=flat-square) | `/api/blogs/:id` | Update existing blog | `{ title, description, category, author, image }` |
| ![DELETE](https://img.shields.io/badge/DELETE-ef4444?style=flat-square) | `/api/blogs/:id` | Delete a blog post | — |
| ![POST](https://img.shields.io/badge/POST-3448C5?style=flat-square) | `/api/upload` | Upload image to Cloudinary | `multipart/form-data` |

</div>

---

## 🎯 Key Functionalities Checklist

<div align="center">

| Feature | Status | Technology |
|:---|:---:|:---|
| Full CRUD Cycle | ✅ | Express + Mongoose + Redux Thunks |
| Global State Sync | ✅ | Redux Toolkit slice architecture |
| Robust DB Connection | ✅ | Mongoose reconnect event listeners |
| Real-time Search | ✅ | Redux filter + query parameters |
| Category Filtering | ✅ | Interactive filter state handlers |
| Multi-sort Options | ✅ | MongoDB sort + JS local fallbacks |
| Cloud Image Upload | ✅ | Cloudinary + Multer memory storage |
| Form Validation | ✅ | Client-side regex utility helpers |
| Zero Layout Shift | ✅ | CSS `aspect-ratio` on all image wrappers |
| GitHub Version Control | ✅ | Git + GitHub repository |

</div>

---

## 📚 Engineering Concept Learnings

```bash
$ cat learnings.log
```

```
[1] Next.js File Routing        → app/blog/[id]/page.js dynamic folder-based routing
[2] Express + CORS Integration  → Cross-origin setup: localhost:3000 ↔ localhost:5000
[3] Mongoose Reconnection       → on('disconnected') + on('error') event listeners
[4] Redux Global State          → Slice reducers + Async Thunks + useSelector/useDispatch
[5] Layout Stability (CLS)      → aspect-ratio on image wrappers = zero layout shift
[6] Cloudinary Pipeline         → Binary → Buffer → CDN URL stored in MongoDB
```

---

## 👨‍💻 Developer

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0d0221&height=3&section=header" width="100%"/>

<br/>

**Sindhav Dinesh** · *Full-Stack Developer / Frontend Engineer*

<br/>

<a href="https://github.com/sindhavdinesh">
  <img src="https://img.shields.io/badge/GitHub-sindhavdinesh-c084fc?style=for-the-badge&logo=github&logoColor=white&labelColor=0d0221"/>
</a>
&nbsp;
<a href="https://www.linkedin.com/in/dinesh-sindhav-2081b8396">
  <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0d0221"/>
</a>
&nbsp;
<a href="mailto:sindhavdinesh82@gmail.com">
  <img src="https://img.shields.io/badge/Gmail-Email_Me-D14836?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0d0221"/>
</a>

</div>

---

## ⭐ Support & Contributions

<div align="center">

If you find **BlogHub** helpful or inspiring:

**⭐ Star this repo** — **🍴 Fork it** — **📢 Share it**

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0d0221&height=120&section=footer" width="100%"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=14&pause=2000&color=7c3aed&center=true&vCenter=true&width=500&lines=%E2%AD%90+Star+the+repo+if+you+found+it+useful!;%F0%9F%A4%9D+Contributions+are+always+welcome;%F0%9F%94%A5+Built+with+passion+by+Sindhav+Dinesh" alt="Footer"/>

<br/>

**Made with ❤️ by [Sindhav Dinesh](https://github.com/sindhavdinesh)**

</div>
