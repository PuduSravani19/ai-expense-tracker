import {useSelector} from 'react-redux'
import AddExpenseForm from './components/AddExpenseForm'
import ExpenseList from './components/ExpenseList'
import SummaryCards from './components/SummaryCards'
import SpendingChart from './components/SpendingChart'
export default function App(){
  const expenses = useSelector(state => state.expenses.items)
  console.log('store data:', expenses)        // ← add this
  console.log('first amount:', expenses[0]?.amount, typeof expenses[0]?.amount)
  return(
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-gray-900">AI EXpense Tracker</h1>
        <SummaryCards />
        <SpendingChart />
        <AddExpenseForm />
        <ExpenseList />

      </div>
    </div>
  )
}
