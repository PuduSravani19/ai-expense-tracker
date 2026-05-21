import {useSelector} from 'react-redux'
import AddExpenseForm from './components/AddExpenseForm'
import ExpenseList from './components/ExpenseList'
import SummaryCards from './components/SummaryCards'
import SpendingChart from './components/SpendingChart'
import AITips from './components/AITips'
export default function App(){
  const expenses = useSelector(state => state.expenses.items)
 
  
  return(
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-linear-to-r from-blue-600 to-blue-500 px-4 py-8">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-white">AI Expense Tracker</h1>
          <p className="text-blue-100 text-sm mt-1">
            Track spending · Get AI insights · Stay on budget
          </p>
        </div>
      </div>

      {/* content */}
      <div className="max-w-xl mx-auto px-4 py-6 flex flex-col gap-5">
        
        <SummaryCards />
        <AITips />
        <SpendingChart />
        <AddExpenseForm />
        <ExpenseList />

      </div>
    </div>
  )
}
