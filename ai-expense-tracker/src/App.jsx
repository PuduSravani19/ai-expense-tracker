
import AddExpenseForm from './components/AddExpenseForm'
import ExpenseList from './components/ExpenseList'
export default function App(){
  return(
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-gray-900">AI EXpense Tracker</h1>
        <AddExpenseForm />
        <ExpenseList />

      </div>
    </div>
  )
}
