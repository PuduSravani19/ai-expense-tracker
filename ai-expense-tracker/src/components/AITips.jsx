import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAITips } from '../features/expenses/expensesSlice'

export default function AITips() {
  const dispatch = useDispatch()
  const { items, aiTips, aiLoading, aiError } = useSelector(state => state.expenses)
  const [lastCalled, setLastCalled] =useState(0)
  const [cooldownMsg, setCooldownMsg] = useState('')

  const handleGetTips = () => {
    if (items.length === 0) return
    const now = Date.now()
    const timeSinceLast = now - lastCalled
    if(timeSinceLast < 30000){
        const secs = Math.ceil((30000 - timeSinceLast)/1000)
        setCooldownMsg(`please wait ${secs} secounds before try again.`)
        return
    }
    setCooldownMsg('')
    setLastCalled(now)
    dispatch(fetchAITips(items))
  }

  // parse "1. tip\n2. tip\n3. tip" into array
  const tipLines = aiTips
    ? aiTips.split('\n').filter(line => line.trim() !== '')
    : []

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-800">💡 AI Budget Tips</h2>
          <p className="text-xs text-gray-400 mt-0.5">Powered by Gemini</p>
        </div>
        <button
          onClick={handleGetTips}
          disabled={aiLoading || items.length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {aiLoading ? 'Thinking...' : 'Get AI Tips'}
        </button>
      </div>

      {/* empty state */}
      {!aiTips && !aiLoading && !aiError && (
        <p className="text-sm text-gray-400 text-center py-4">
          {items.length === 0
            ? 'Add some expenses first to get tips'
            : 'Click "Get AI Tips" to analyse your spending'}
        </p>
      )}

      {/* loading */}
      {aiLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-400 py-4 justify-center">
          <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          Analysing your spending...
        </div>
      )}

      {/* error */}
      {aiError && (
        <p className="text-sm text-red-400 text-center py-4">{aiError}</p>
      )}

      {/* tips */}
      {tipLines.length > 0 && (
        <ul className="flex flex-col gap-3">
          {tipLines.map((tip, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700 bg-blue-50 rounded-xl px-4 py-3">
              <span className="text-blue-400 font-semibold shrink-0">{i + 1}.</span>
              <span>{tip.replace(/^\d+\.\s*/, '')}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}