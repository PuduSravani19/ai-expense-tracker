
# 💰 AI Expense Tracker

An AI-powered expense tracking app that helps you monitor spending, visualize categories, and get personalized budget tips using Google Gemini API.

## 🔗 Live Demo
[https://ai-expense-tracker-gubf.vercel.app/]

## ✨ Features
- ➕ Add and delete expenses by category
- 📊 Live spending chart by category (Recharts)
- 💡 AI budget tips powered by Gemini API
- 🧮 Summary cards — total spent, top category, expense count
- 💾 localStorage persistence — data survives page refresh
- 📱 Fully responsive UI

## 🛠️ Built With
- React
- Redux Toolkit (slices + async thunks)
- Gemini API (AI budget tips)
- Recharts (bar chart)
- Tailwind CSS
- Vite
- Vercel (deployment)

## 🧠 What I Learned
- Redux Toolkit — createSlice, createAsyncThunk
- Managing 3 API states — loading, success, error
- localStorage middleware pattern
- Derived state with useSelector and reduce()
- Environment variables with Vite + Vercel

## 🚀 Run Locally
git clone https://github.com/PuduSravani19/ai-expense-tracker
cd ai-expense-tracker
npm install

# create .env file
VITE_GEMINI_API_KEY=your_key_here

npm run dev

## 📁 Folder Structure
src/
├── app/
│   └── store.js
├── features/
│   └── expenses/
│       └── expensesSlice.js
├── components/
│   ├── AddExpenseForm.jsx
│   ├── ExpenseList.jsx
│   ├── SummaryCards.jsx
│   ├── SpendingChart.jsx
│   └── AITips.jsx
├── App.jsx
└── main.jsx