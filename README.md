# Real-Time Chat Interface  
Frontend Engineer Assessment – React + TypeScript

A real-time chat UI that simulates streaming bot responses using asynchronous message handling and a custom message queue.

---

## 🚀 Features

### Core Features
- Conversational bubble layout
- User and bot messages
- Message timestamps
- Message states (Sent, Delivered, Failed)
- Retry-ready architecture

### Streaming Simulation
- Simulated async backend using `setTimeout`
- Bot typing indicator
- Streaming response in chunks (3–5 segments)
- Custom message queue to prevent race conditions

### Persistence
- Entire chat history stored in `localStorage`
- History restored on page refresh

### UX Enhancements
- Auto-expanding textarea
- Enter to send / Shift+Enter for newline
- Smooth hover and click animations
- Disabled send button when empty
- Responsive layout

---

## 🛠 Tech Stack

- React 18
- TypeScript
- Vite
- Custom async message queue
- LocalStorage for persistence
- No external UI libraries used

---

## 📁 Folder Structure

├── components/
├── hooks/
├── services/
├── types/
├── utils/
├── App.tsx
└── main.tsx


The architecture separates:
- UI components
- State management logic
- Async streaming simulation
- Queue handling
- Type definitions

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd real-time-chat-interface
npm install
npm run dev
