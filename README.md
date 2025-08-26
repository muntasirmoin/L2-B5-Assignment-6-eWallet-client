<h1 align="center">💰 E-WALLET 💰</h1>
<h2 align="center">Digital Wallet Frontend </h2>
<h3 align="center">It provides users with a secure, fast, and responsive interface for managing their e-wallet. </h3>
<p align="center"> This project is the Frontend of an E-Wallet Management System, built with a modern React ecosystem MERN stack. Modern tools in the React ecosystem, including React Router, Redux Toolkit, RTK Query, and TypeScript.</p>

## 📖 Overview

This project is a **Digital Wallet Management System** that enables users to securely manage their funds and perform financial transactions within a user-friendly interface.

### 🔑 Core Features

- **Add Money** – Deposit funds into your wallet from external sources.
- **Cash-In via Bank Agent** – Users can add money to their wallet by depositing cash through authorized bank agents.
- **Withdraw Money** – Transfer funds from your wallet to external accounts.
- **Cash-Out via Bank Agent** – Users can withdraw money from their wallet in cash through authorized bank agents.
- **Send Money** – Instantly transfer money to other registered users.
- **Transaction History** – Track, view, and manage all past transactions.
- **Wallet Balance** – Instantly check your current wallet balance.

The system is built with a focus on **security**, **scalability**, and **ease of use**, providing a seamless experience for digital payments and personal finance management.

---

### 🏠 User Dashboard

- Overview with wallet balance, quick actions, and recent transactions
- Deposit money
- Withdraw money
- Send money to another user
- Transaction history with:
  - Pagination
  - Filtering by type
- Profile management: update name, phone, and password

---

### 🏢 Agent Dashboard

- Overview with cash-in/out summary and recent activity
- Add money to a user’s wallet (cash-in)
- Withdraw money from a user’s wallet (cash-out)
- View all transactions handled by the agent
- Commission history
- Profile management: update personal info and password

---

### 🛡️ Admin Dashboard

- Overview with total users, agents, transaction count, and volume
- Manage users: view, block/unblock wallets
- Manage agents: approve, suspend
- View all transactions with filters and search
- Profile management: update admin account settings

## 🔑 Key Features

- **Role-Based Navigation Menu**  
  Dynamic Dashboard menus tailored to each user role (User, Agent, Admin) for intuitive access.

- **Loading Indicators & Global Error Handling**  
  Visual feedback during API calls and centralized handling of errors to improve user experience.

- **Form Validations**  
  Includes required fields, numeric checks, and positive amount validations to ensure data integrity.

- **Data Visualization Components**  
  Interactive UI elements such as cards, bar charts, pie charts, and tables, all dynamically updated to reflect real-time data.

- **Toast Notifications**  
  Instant success/error messages using toast libraries for snappy UI feedback and improved user communication.

- **Guided Tour**  
   `react-joyride`

  - Highlighting key features, such as the navigation menu!

- **🔒 Role-Based Access Control (RBAC)**  
  Secure API endpoints enforcing role restrictions to ensure users only access authorized resources.

## 📂 Structure Overview

/ src  
│  
├── /assets  
│ └── /images # Static images and icons  
│  
├── /components  
│ ├── /layout
│ ├── /module  
│ └── /ui  
│  
├── /config  
│  
├── /constants  
│  
├── /context  
│  
├── /hooks
│  
├── /lib  
│  
├── /pages
│  
├── /provider  
│  
├── /redux  
│  
├── /routes
│  
├── /types
│  
├── /utils
│  
├── app.tsx
├── main.tsx  
└── index.css

## 🧰 Tech Stack

- ⚛️ **React** – UI library for building interactive user interfaces
- 🧭 **React Router** – Client-side routing for React applications
- 🛠 **TypeScript** – Typed JavaScript for safer and more maintainable code
- ⚡ **Redux Toolkit** – Simplified and efficient Redux state management
- 🔍 **RTK Query** – Powerful data fetching and caching tool integrated with Redux Toolkit
- 🎨 **Tailwind CSS** – Utility-first CSS framework for rapid styling
- 🧹 **ESLint** – Linting tool to enforce code quality and style
- 🔔 **React Toast Sonner** (or similar) – Toast notifications for user feedback

### Additional Tools

- 🔒 **Role-Based Access Control (RBAC)** implemented in frontend routing and API calls
- 🧩 **Custom Hooks & Context** for reusable logic and state management
- 📊 **Data Visualization** using charts and tables for dashboard insights
- 🧭 **Guided Tours** (e.g., react-joyride) for onboarding users

---

### 📦 Installation Steps

1. **Clone the Repository Frontend**

   ```bash
   https://github.com/muntasirmoin/L2-B5-Assignment-6-eWallet-client.git
   ```

2. **Clone the Repository Backend**

   ```bash
    https://github.com/muntasirmoin/L2-B5-Assignment-5-eWallet-server.git
   ```

3. **Install Dependencies**

   ```bash
   npm install / bun install
   ```
