import {useSelector} from 'react-redux'
export default function SummaryCards(){
    const expenses = useSelector(state => state.expenses.items)
    const total = expenses.reduce((sum,e)=>sum+e.amount,0)
    const categoryTotals = expenses.reduce((acc,e)=>{
        acc[e.category]=(acc[e.category] || 0)+e.amount
        return acc
    },{})
    const topCategory = Object.entries(categoryTotals).sort((a,b)=>b[1]-a[1][0])
    const count = expenses.length
    return(
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-xs text-gray-400 mb-1">Total Spent</p>
                <p className="text-xl fot-semibold text-gray-900">₹{total.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-xs text-gray-400 mb-1">Top Category</p>
                <p className="text-xl font-semibold text-gray-900">{topCategory ? topCategory[0]: '-'}</p>
                <p className="text-xs text-gray-400 mt-1"> {topCategory ? `₹${topCategory[1].toFixed(2)}` : 'No data'}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-xs text-gray-400 mb-1">Total Expenses</p>
                <p className="text-xl font-semibold text-gray-900">{count}</p>
                <p className="text-xs text-gray-400 mt-1">{count === 1 ? '1 item': `${count} items`}</p>
            </div>

        </div>
    )
}