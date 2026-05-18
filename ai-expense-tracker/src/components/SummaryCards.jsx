
import { useSelector } from 'react-redux'
 const cards =[
    {bg: 'bg-blue-50', accent: 'text-blue-600', label:'Total Spent'},
    {bg: 'bg-purple-50', accent: 'text-purple-600', label:'Top Category'},
    {bg:'bg-green-50', accent: 'text-green-600',label: 'Total Expenses'},
 ]

export default function SummaryCards() {
  const expenses = useSelector(state => state.expenses.items)

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0)

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount)
    return acc
  }, {})

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])
  const topCategory = sortedCategories[0]  // ← ["Food", 1200] or undefined

  const count = expenses.length
  const data = [
    {
        value: `₹${total.toFixed(2)}`,
        sub: count === 0 ? 'No expenses Yet' : 'across ${count} items',
    },
    {
        value: topCategory ? topCategory[0]:'-',
        sub: topCategory ? `₹${topCategory[1].toFixed(2)}`: 'No data',
    },
    {
        value: count,
        sub: count === 1 ? '1 expense' : `${count} expenses`,
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
        {cards.map((card, i)=>(
            <div key={i} className={`${card.bg} rounded-2xl p-4`}>
                <p className="text-xs text-gray-400 mb-1">{card.label}</p>
                <p className={`text-lg font-bold ${card.accent}`}>{data[i].value}</p>
                <p className="text-xs text-gray-400 mt-1 truncate">{data[i].sub}</p>
                </div>

        ))}
    
    </div>
  )
}