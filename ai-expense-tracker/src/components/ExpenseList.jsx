import {useSelector, useDispatch} from 'react-redux'
import { deleteExpense } from '../features/expenses/expensesSlice'
const CATEGORY_COLORS={
    food:'bg-orange-100 text-orange-700',
    Transport:'bg-blue-100 text-blue-700',
    Shopping: 'bg-pink-100 text-pink-700',
    Health: 'bg-green-100 text-pink-700',
    Bills: 'bg-purple-100 text-purple-700',
    Other:'bg-gray-100 text-gray-700',

}
export default function ExpenseList(){
    const expenses=useSelector(state=>state.expenses.items)
    const dispatch =useDispatch()
    if(expenses.length === 0){
        return(
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Expenses</h2>
                <ul className="flex flex-col gap-3">
                    {[...expenses].reverse().map(expense=>(
                        <li key={expense.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                            <div className="flex flex-col gap-1">
                              <span className='text-sm font-medium text-gray-800'>{expense.description}</span>
                              <div className="flex gap-2 items-center">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[expense.category]}`}>{expense.category}</span>
                                <span className={`text-xs text-gray-400`}>{expense.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className='text-sm font-semibold text-gray-800'>rs{expense.amount.toFixed(2)}</span>
                                <button onClick={()=>dispatch(deleteExpense(expense.id))} className='text-gray-300 hover:text-red-400 transition-colors text-lg leading-none'>*</button>
                            </div>
                        </li>
                    ))}
                </ul>   

            </div>
        )
    }
}