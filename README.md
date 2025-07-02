# taskflow-todo-list-project

# ✅ TaskFlow – The Ultimate Productivity Companion

A sleek, fully responsive, feature-rich productivity app that helps users take control of their time, mindset, and to-do list — all in one place. TaskFlow combines essential task management with Pomodoro focus sessions, daily affirmations, reminders, and analytics to track your growth and motivation.

---

## 🚀 Live Demo

🔗 https://taskflowbysri.netlify.app/

---

## 🌟 Key Features

### ✅ Advanced Task Management
- Add, edit, delete tasks
- Prioritize with categories and urgency levels
- Set due dates with smart formatting
- Task completion toggle and organization

### ⏱️ Pomodoro Timer
- 25-minute focus sessions with automatic 5-minute breaks
- Pause, reset, and loop functionality
- Visual countdown and sound alerts

### 💬 Daily Affirmations
- Inspiring daily quotes to keep you motivated
- Stored locally or fetched from a quotes API
- Positive reinforcement built into your daily flow

### 🔔 Smart Reminders
- Notifications for upcoming tasks
- Multiple reminder types: timed, recurring, and one-time
- Uses browser localStorage and Notifications API

### 📊 Productivity Analytics (Upcoming)
- Daily task completion stats
- Pomodoro usage tracking
- Progress charts and streaks (planned)

---

## 🎨 Design System

| Element         | Design |
|----------------|--------|
| 🎨 Theme        | Dark mode first with blue gradient background `#1e3a8a → #1e40af` |
| 🎯 Accent Color | Green for actions: `#10b981`, `#059669` |
| 📐 Layout       | Card-based UI with rounded corners & soft shadows |
| 🖋 Typography   | Clean hierarchy using system fonts & Tailwind defaults |
| ✨ Animations   | Hover states, micro-interactions for buttons and cards |

---

## 🧱 Tech Stack

| Layer         | Tech Used |
|---------------|-----------|
| ⚛️ Frontend    | React 18 + TypeScript |
| 🎨 Styling     | Tailwind CSS |
| 🚀 Build Tool  | Vite.js |
| 🌐 Routing     | React Router |
| ⚙️ State Mgmt  | Context API (or Zustand in future) |
| 📦 Other       | ESLint, Prettier, Icons (Lucide), Toasts (Coming soon) |

---

## 📁 Project Structure

```plaintext
src/
├── components/        # UI Components (TaskCard, Pomodoro, etc.)
├── pages/             # Page-level views (Home, Stats, Settings)
├── context/           # Global state providers
├── hooks/             # Custom React hooks
├── utils/             # Helper functions
├── assets/            # Images, icons
├── App.tsx            # Main app layout
└── main.tsx           # Entry point
