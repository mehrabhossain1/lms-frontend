# 📘 LearnHub – Online LMS Platform

An online Learning Management System (LMS) built with **Next.js 15** and a **Node.js + Express backend**. Users can browse free and paid courses, enroll, and track learning progress. Admins can manage courses, users, and reviews from a role-based dashboard.

## 🔗 Live Links

-   🌐 Frontend: [Vercel Deployment](https://your-vercel-link.vercel.app)
-   🚀 Backend: [Render API](https://lms-backend-5lk5.onrender.com)

---

## 👤 User Roles

### 🧑 Student

-   Browse all courses (free and paid)
-   Register and login
-   Access free content
-   Enroll in paid courses after registration
-   Track progress in student dashboard

### 👨‍💼 Admin

-   Secure login
-   Create, update, delete courses
-   View student list and reviews
-   Manage platform content via admin dashboard

---

## ✅ Features Implemented

-   ✅ Authentication (JWT-based)
-   ✅ Role-based dashboard routing (admin & student)
-   ✅ Course listing with public/free/paid filter
-   ✅ Single course detail page
-   ✅ User registration & login flow
-   ✅ Zustand for auth state management
-   ✅ TailwindCSS + shadcn/ui components
-   ✅ Fully responsive layout

---

## 🛠️ Tech Stack

-   **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS, shadcn/ui, Zustand
-   **Backend**: Node.js, Express, MongoDB
-   **Auth**: JWT (with role-based protection)
-   **Deployment**: Vercel (frontend), Render (backend)

---

## ⚙️ Project Structure

```bash
lms-frontend/
├── app/
│   ├── login/
│   ├── register/
│   ├── courses/
│   └── dashboard/
│       ├── admin/
│       └── student/
├── components/
│   ├── Navbar.tsx
│   └── ...
├── store/
│   └── auth-store.ts
└── ...
```

## 📦 Future Improvements (Post-submission)

-   Payment integration for paid courses

-   Video hosting via Cloudinary/YouTube embed

-   Student course progress tracker

-   Review & rating system

-   Admin charts and analytics
