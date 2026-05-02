import { useState} from 'react'
import {useDispatch} from 'react-redux'
import { addExpense} from '../features/expenses/expensesSlice'
const categories = ['food','Transport','Shopping','Health', 'Bills','Other']
export default function AddExpenseForm(){
    const dispatch = useDispatch()
    const [form, setForm] =useState({
        description: '',
        amount:'',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
    })
    const handleChange =(e)=>{
        setForm({...form,[e.target.name]: e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!form.description || !form.amount)return
        dispatch (addExpense(form))
        setForm({
            description:'',
            amount:'',
            category: 'Food',
            date:new Date().toISOString().split('T')[0],
        })
    }
    return(
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Add Expenses</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="description" value={form.description} onChange={handleChange} placeholder="what did you spend on?"
                 className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                <div className="grid grid-cols-2 gap-3">
                    <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="amount (rs)"
                    className="boder border-gray-200 rounded-lg px-4 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-blue-100 w-full" />
                    <select name="category" value={form.category} oChange={handleChange} 
                    className="border border-gray-100 rounded-lg text-sm w-1/2 px-4 py-2 focus:outline-none focus:ring-2 focus ring-blue-100" w-full>
                         {categories.map(cat=>(<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                 
               
               
                </div>
                <input name="date" type="date" value={form.date} onChange={handleChange} 
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 " />
                <button type="submit"className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium transition-colors">Add Expense</button>
            </form>
        </div>
    )
    
}