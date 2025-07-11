# 🛍️ Rohiverse E-commerce Store

An advanced, full-featured e-commerce web app built using **React**, **Firebase**, **Netlify Functions**, and **Pexels API**. It includes product search, cart, wishlist, checkout, order history, user profile, and more — all with modern responsive UI/UX.

---

## 🚀 Features

✅ Modern Product Grid/List Views  
✅ Add to Cart + Wishlist with Microinteractions  
✅ Firebase Authentication (Email/Password & Phone OTP)  
✅ Avatar Upload & Profile Editing  
✅ Address Management with Default Support  
✅ Order History Page  
✅ Protected Routes & Keyboard Navigation (Tab + Enter)  
✅ Responsive Mobile-First Layout  
✅ Dark Mode Ready  
✅ Live Search with AI Suggestions  
✅ Firebase Email Verification & Password Update  
✅ Animated Transitions with Framer Motion  
✅ Serverless Proxy to Pexels API using Netlify Functions  
✅ Toast Notifications for Actions  
✅ PWA Support with Favicon + Install Icon

---

## 🏗️ Tech Stack

- ⚛️ React + Tailwind CSS
- 🔥 Firebase (Auth, Firestore, Storage)
- 🔑 Firebase Email/Phone Login + Verification
- 💾 Firestore (User data, addresses, orders)
- 🖼️ Pexels API for dynamic product data
- 📦 Netlify Functions (proxy for Pexels API)
- 🛒 Context API for Cart & Wishlist
- 🌐 React Router
- ⚡ Axios for HTTP requests
- 🧠 LocalStorage for Wishlist & Display Name
- 🍞 react-hot-toast for feedback
- 🧪 Framer Motion for microinteractions

---

## 🧩 Folder Structure

```
root/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── firebase.js
│   ├── App.jsx
│   └── index.js
├── netlify/
│   └── functions/
│       └── pexels.js
├── package.json
├── tailwind.config.js
├── netlify.toml
└── README.md

```

---

## 🧪 Local Development

### 1. Install Dependencies

```
npm install
```

### 2. Set Up Firebase

* Go to [Firebase Console](https://console.firebase.google.com/)
* Create a project
* Enable:

  * Authentication (Email/Password, Phone, etc.)
  * Firestore
  * Storage
* Add your domain in **Authentication → Settings → Authorized Domains**

#### 🔐 Create `.env` (or directly in `firebase.js`)

```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 3. Run Locally

```
npm run dev
```

---

## ⚙️ Netlify Function Setup

Netlify Functions act as a secure proxy to Pexels (hiding your API key):

### ➕ Folder: `/netlify/functions/pexels.js`

```
// use axios to call Pexels and return results
```

### 📁 `netlify.toml`

```
[build]
  command = "npm run build"
  publish = "build"          # or "build" for Vite, CRA etc.
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### 🔑 Add Pexels API Key

Inside `pexels.js`, replace `Authorization: "YOUR_PEXELS_API_KEY"` with your actual key.

### ▶️ Run Functions Locally

```
npx netlify dev
```

Test your function locally at:

```
http://localhost:8888/.netlify/functions/pexels?query=shopping&per_page=5
```

---

## 🔐 Firebase Config Tips

* ✅ Add your **Netlify or localhost** domain to Firebase Auth → Settings → Authorized Domains.
* ✅ Enable **Email Verification** for better security.
* ✅ Configure Firestore rules for authenticated access only.

---

## 📦 Deployment

1. Push your project to GitHub.
2. Go to [Netlify](https://netlify.com), connect repo, and deploy.
3. Make sure `netlify/functions` is picked up for serverless.
4. Update Firebase Auth → Authorized domains with `rohiverse.netlify.app`.

---

## ✨ Credits

* Built with ❤️ by [Rohit](https://github.com/rohitjangir7100)
* Powered by:

  * Firebase
  * Netlify
  * Pexels API
  * React + Tailwind + Framer Motion

---

## 📬 Contact

Have questions or ideas?
Open an issue or contact me via profile page!

---

## 📝 License

This project is open-sourced under the **MIT License**.
