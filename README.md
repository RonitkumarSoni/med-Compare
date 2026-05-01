# 💊 MedCompare – Hyperlocal Medicine Price Comparison Platform

A premium healthcare SaaS platform that helps users compare medicine prices across nearby pharmacies in real-time and choose the most affordable option.

---

## 🚀 Problem Statement

Medicine prices vary significantly across pharmacies (often 30–50% difference for the same drug).  
There is no simple way for users to compare prices and find the best deal nearby.

---

## 💡 Solution

**MedCompare** solves this problem by:

- 📍 Showing real-time medicine prices from nearby pharmacies  
- 💰 Helping users find the cheapest option instantly  
- 🏥 Providing verified pharmacy listings  
- 📊 Giving insights like price trends and savings  

---

## ✨ Features

### 👤 User Side
- 🔍 Search medicines easily  
- 📊 Compare prices across pharmacies  
- 📍 View nearby availability  
- 💡 Get best deal suggestions (Cheapest / Nearest / Best Value)  
- ⭐ Verified pharmacy badges  

---

### 🏪 Pharmacy Side (Vendor Dashboard)
- 📦 Inventory management system  
- 💰 Update medicine prices  
- 📊 View analytics & insights  
- 📥 Handle user inquiries  
- 📍 Manage shop profile & location  

---

### 📈 Advanced Features
- 📊 Price trend visualization  
- 🏷️ Smart tags (Best Value / Cheapest)  
- 📉 Savings calculation  
- 🔔 Alerts for low stock / expiring medicines  

---

## 🖥️ UI/UX Highlights

- ✨ Premium healthcare SaaS design  
- 🎨 Soft blue gradient theme  
- 📱 Fully responsive layout  
- 🧩 Clean dashboard + card-based UI  
- 🧠 Intuitive user flow  

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)  
- **Backend:** Node.js / Express  
- **Database:** Supabase (PostgreSQL)  
- **Auth:** Supabase Auth (Google OAuth)  
- **Styling:** Tailwind CSS  
- **Deployment:** Vercel (Frontend) / Render (Backend)  

---

## 📂 Project Structure

```text
medCompare/
├── backend/
│   ├── src/
│   │   ├── config/          # Supabase & env configuration
│   │   ├── controllers/     # Route handler logic
│   │   ├── middlewares/      # Auth, error handling middleware
│   │   ├── models/           # Data models
│   │   ├── routes/           # API route definitions
│   │   │   ├── authRoutes.js
│   │   │   ├── medicineRoutes.js
│   │   │   ├── pharmacyRoutes.js
│   │   │   ├── inquiryRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   ├── uploadRoutes.js
│   │   │   ├── chatRoutes.js
│   │   │   └── dashboardRoutes.js
│   │   ├── services/         # Business logic services
│   │   ├── utils/            # Helper functions
│   │   ├── validations/      # Input validation schemas
│   │   ├── app.js            # Express app setup & middleware
│   │   └── server.js         # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   ├── avatars/          # User avatar images
│   │   ├── images/           # Static images
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── api/              # Axios API client
│   │   ├── assets/           # Static assets
│   │   ├── components/
│   │   │   ├── common/       # Reusable components (SEO, Skeleton, etc.)
│   │   │   ├── layout/       # Layout components (Navbar, Sidebar)
│   │   │   └── ui/           # UI components (Buttons, Cards)
│   │   ├── context/          # React context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility libraries
│   │   ├── pages/            # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── MedicineCompare.jsx
│   │   │   ├── MedicineDetails.jsx
│   │   │   ├── ComparisonPage.jsx
│   │   │   ├── PharmacyDashboard.jsx
│   │   │   ├── PharmacyDetail.jsx
│   │   │   ├── PharmacySettings.jsx
│   │   │   ├── PharmacyInsights.jsx
│   │   │   ├── InventoryManagement.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   ├── SavedWatchlist.jsx
│   │   │   ├── AdminOversight.jsx
│   │   │   ├── ClinicalAnalytics.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── PrivacyPage.jsx
│   │   │   └── ...more
│   │   ├── routes/           # React Router route definitions
│   │   ├── store/            # State management
│   │   ├── utils/            # Frontend utility functions
│   │   ├── App.jsx           # Root App component
│   │   ├── main.jsx          # Vite entry point
│   │   └── index.css         # Global styles
│   ├── vercel.json           # Vercel SPA routing config
│   ├── vite.config.js        # Vite configuration
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── render.yaml               # Render deployment config
├── .gitignore
└── README.md
```

---

## 🔗 Live Demo

- **Frontend:** [https://med-compare.vercel.app](https://med-compare.vercel.app)  
- **Backend API:** [https://med-compare-2wge.onrender.com](https://med-compare-2wge.onrender.com)  

---

## 🎨 Figma Design

👉 View Full UI/UX Design here:  
https://www.figma.com/design/svFKcrbxUl8nmBNylqzpfj/Untitled?node-id=6-4&p=f&t=TNVPmkZYcl7L2JGY-0

- Complete UI screens  
- User flow & dashboard design  
- Premium healthcare SaaS layout  
- Designed with focus on clean UI, proper spacing, and real-world usability  

---

## 🚀 Future Scope

- 🤖 AI-based medicine recommendations  
- 📦 Home delivery integration  
- 🏥 Hospital integration  
- 💳 Payment gateway support  
- 📍 GPS-based smart suggestions  

---

## 🎯 Goal

To bring **transparency in medicine pricing** and help users make smarter healthcare decisions.

---

## 🤝 Contributing

This is a forked project used for learning and development purposes. Contributions and improvements are welcome.

---

## 📜 License

This project is for educational and hackathon purposes.
