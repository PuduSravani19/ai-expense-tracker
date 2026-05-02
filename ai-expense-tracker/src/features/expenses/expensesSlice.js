import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    items: [],

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
    }
})
export const {addExpense, deleteExpense} = expensesSlice.actions
export default expensesSlice.reducer