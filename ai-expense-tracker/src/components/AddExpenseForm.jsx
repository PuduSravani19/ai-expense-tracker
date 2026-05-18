
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addExpense } from '../features/expenses/expensesSlice'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Health', 'Bills', 'Other']

export default function AddExpenseForm() {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.description || !form.amount) return
    dispatch(addExpense(form))
    setForm({
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
    })
  }

  const inputClass = "border border-gray-200 rounded-xl px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="What did you spend on?"
          className={inputClass}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount (₹)"
            className={inputClass}
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className={inputClass}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
        >
          + Add Expense
        </button>
      </form>
    </div>
  )
}