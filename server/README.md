# 🧠 Rekall - Knowledge Sharing Platform

_Rekall_ is a platform that allows users to save and share valuable content such as **YouTube videos** and **Twitter posts**. Each user gets a unique **shareable link**, can log in securely, and manage their content.

---

## ✅ Phase 1: Backend API (Completed)

### 🔧 Tech Stack (Backend)
- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **bcryptjs** (for password hashing)
- **dotenv**, **cors**, **uuid**, **Postman** (for testing)

---

### ✅ Features Implemented

| #  | Feature / Route                          | Status | Tools Used | Description |
|----|------------------------------------------|--------|------------|-------------|
| 1  | **Project Setup with TypeScript**        | ✅     | Express + TS | Backend project initialized with clean structure |
| 2  | **MongoDB connection**                   | ✅     | Mongoose     | Connected MongoDB using `.env` variables |
| 3  | **User Schema & Model**                  | ✅     | Mongoose     | Fields: `username`, `email`, `password`, `shareLink` |
| 4  | `POST /api/auth/signup`                  | ✅     | bcryptjs, uuid | Signup with hashed password and unique share link |
| 5  | `POST /api/auth/login`                   | ✅     | JWT, bcryptjs | Validates credentials and returns JWT token |
| 6  | **JWT Token Generation with Expiry**     | ✅     | jsonwebtoken | Tokens expire in 1 hour |
| 7  | **JWT Auth Middleware**                  | ✅     | Custom Middleware | Validates token and adds `userId` to request |
| 8  | `GET /api/user/me`                       | ✅     | Protected route | Fetch current logged-in user's details |
| 9  | **Content Schema & Model**               | ✅     | Mongoose | Fields: `title`, `description?`, `tag`, `link`, `userId` |
| 10 | `POST /api/content/add`                  | ✅     | Protected route | Adds content (YouTube/Twitter) for logged-in user |
| 11 | `GET /api/content/all`                   | ✅     | Protected route | Get all content for a specific user |
| 12 | **Postman Testing**                      | ✅     | Postman | All routes tested including auth and content creation |
| 13 | **Error Handling**                       | ✅     | try-catch | Clear error messages and response codes |

---

### 🚧 Delayed / For Future Release

| Feature | Reason |
|---------|--------|
| 🔄 Pagination on content listing | Will be done in **v2** after frontend is integrated |
| 🔗 Public access via shareLink | To be added with content preview page |
| ❤️ Like / Save system | Scheduled after UI is complete |

---

## 🚀 Phase 2: Frontend (Next.js + Tailwind CSS)

### 🔧 Tech Stack (Frontend)
- **Next.js** (with TypeScript)
- **Tailwind CSS**
- **Axios** (for API calls)
- **react-hot-toast** (for notifications)
- **React Hook Form + Zod** (for forms)
- **JWT stored in localStorage**

---

### 📌 Frontend Roadmap

| # | Feature | Status |
|---|---------|--------|
| 1 | Initialize Next.js app with Tailwind CSS | 🔜 |
| 2 | Create Signup & Login pages | 🔜 |
| 3 | Call backend APIs from forms | 🔜 |
| 4 | Store JWT in localStorage | 🔜 |
| 5 | Use toast notifications for feedback | 🔜 |
| 6 | Create protected Dashboard page | 🔜 |
| 7 | Add Content form (YouTube/Twitter) | 🔜 |
| 8 | Fetch and display user content | 🔜 |
| 9 | Logout functionality | 🔜 |

---

## 📁 Folder Structure (Backend)

/client
  ├── /components
  ├── /pages
  │   ├── Landing.tsx
  │   ├── Register.tsx
  │   ├── Login.tsx
  │   ├── Dashboard.tsx
  │   ├── AddContent.tsx
  │   └── ShareView.tsx
  ├── /utils
  │   └── axiosInstance.ts
  └── App.tsx