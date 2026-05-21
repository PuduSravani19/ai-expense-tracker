
import { useSelector, useDispatch } from 'react-redux'
import { deleteExpense } from '../features/expenses/expensesSlice'

const CATEGORY_COLORS = {
  Food: 'bg-orange-100 text-orange-600',
  Transport: 'bg-blue-100 text-blue-600',
  Shopping: 'bg-pink-100 text-pink-600',
  Health: 'bg-green-100 text-green-600',
  Bills: 'bg-purple-100 text-purple-600',
  Other: 'bg-gray-100 text-gray-600',
}
const   CATEGORY_EMOJI ={
    Food: '🍔',
    Transport:'🚌',
    Shopping:'🛍️',
    Health:'💊',
    Bills:'📄',
    other:'📦',
}

export default function ExpenseList() {
  const expenses = useSelector(state => state.expenses.items)
  const dispatch = useDispatch()

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Expenses</h2>

      {expenses.length > 0 && (
        <span className="m1-2 text-xs font-normal text-gray-400">
          ({expenses.length})
        </span>
      )} 
      {expenses.length === 0 ? (
        <div className="flex flex-col items-center py-8 gap-2">
          <span className="text-4xl">🧾</span>
          <p className="text-gray-400 text-sm">No expenses yet</p>
          <p className="text-gray-300 text-xs">Add your first expense above</p>
        </div>
      ):(
         <ul className="flex flex-col divide-y divide-gray-50">
          {[...expenses].reverse().map(expense => (
            <li key={expense.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  {CATEGORY_EMOJI[expense.category] || '📦'}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {expense.description}
                  </p>
                  <div className="flex gap-2 items-center mt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[expense.category] || 'bg-gray-100 text-gray-600'}`}>
                      {expense.category}
                    </span>
                    <span className="text-xs text-gray-300">{expense.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-800">
                  ₹{Number(expense.amount).toFixed(2)}
                </span>
                <button
                  onClick={() => dispatch(deleteExpense(expense.id))}
                  className="w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-400 transition-colors"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

      
       
       