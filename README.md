# 🧠 Code Colab — Real-Time Code Editor with AI Suggestions

A real-time collaborative code editor built using **React**, **Node.js**, **Socket.io**, and **Monaco Editor**. Enhanced with an **AI Suggestion** feature powered by Google Gemini or OpenAI GPT API to boost productivity by providing code completions and improvements on the fly.

---

## 🚀 Features

- ✅ Real-time collaborative editing using Socket.io
- ✅ Monaco Editor integration (VS Code-like feel)
- ✅ Join via Room ID — work with others instantly
- ✅ Live user list with typing indicators
- ✅ AI-powered code suggestions with copy-to-clipboard support
- ✅ Clean UI with popup for AI suggestion display

---


## 🧑‍💻 Tech Stack

| Frontend     | Backend     | Real-Time      | AI Integration |
|--------------|-------------|----------------|----------------|
| React        | Node.js     | Socket.io      | Gemini API / OpenAI |
| Tailwind CSS | Express     | WebSockets     | axios |

---

## 🧩 Project Structure
```bash
code-colab/
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── App.jsx
│ │ └── index.js
├── server/
│ ├── index.js
├── README.md
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/code-colab-ai.git
cd code-colab-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Create a `.env` file in the backend directory and add your API keys:

```env
GEMINI_API_KEY=your-gemini-api-key
OPENAI_API_KEY=your-openai-api-key
```

### 4. Start the server

```bash
npm run dev
```

### 5. Open the client

```bash
cd client
npm start
```

---

