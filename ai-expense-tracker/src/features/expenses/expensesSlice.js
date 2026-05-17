import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchAITips = createAsyncThunk(
    'expenses/fetchAITips',
    async(expenses)=>{
        const summary = expenses.map(e=> `${e.amount} ($ {e.category}) on ${e.date}`).join('\n')
        const prompt = 'here are my recent expenses:\n${summary}\n\nGive me 3 short, practical budget tips based on this spending. Each tip should be one sentence. Return as a numbered list.'
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
            {
                method:'POST',
                headers:{ 'Content-Type':'application/json'},
                body:JSON.stringify({
                    contents:[{parts:[{text:prompt}] }]
                })
            }
        )
        const data = await response.json()
        return data.candidates[0].content.parts[0].text
  
    }
)
const initialState = {
    items: [],
    aiTips:'',
    aiLoading: false,
    aiError:'',

}
const expensesSlice = createSlice({
    name : 'expenses',
    initialState,
    reducers: {
    addExpense:(state,action)=>{
        state.items.push({
            id:Date.now(),
            description: action.payload.description,
            amount: parseFloat(action.payload.amount),
            category: action.payload.category,
            date: action.payload.date,
            
        })
    },
    deleteExpense: (state,action)=>{
        state.items = state.items.filter(item => item.id !== action.payload)
    },
    },
    // - handle the 3 async states -
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAITips.pending,(state)=>{
            state.aiLoading=true
            state.aiError=''
            state.aiTips=''
        })
        .addCase(fetchAITips.fulfilled,(state,action)=>{
            state.aiLoading = false
            state.aiTips = action.payload
        })
        .addCase(fetchAITips.rejected,(state,action)=>{
            state.aiLoading = false
            state.aiError ='Failed to get tips. Check your API Key.'
        })
    }
})
export const {addExpense, deleteExpense} = expensesSlice.actions
export default expensesSlice.reducer