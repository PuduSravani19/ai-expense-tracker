import {configureStore} from '@reduxjs/toolkit'
import expensesReducer from '../features/expenses/expensesSlice'
 // - Load from localStorage on app start
const loadState =() => { 
    try{
        const saved=localStorage.getItem('expenses')
        return saved ? JSON.parse(saved) : undefined
    } catch{
        return undefined
    }
}
// - save to localStorage after every action
const saveState = (state)=>{
    try{
        localStorage.setItem('expenses',JSON.stringify(state.expenses.items))
    }
    catch{}

}
const preloadedState = loadState()? {expenses : {items:loadState(),aiTips:'', aiLoading:false, aiError:''}} : undefined
export const store = configureStore({
    reducer: {
        expenses: expensesReducer,
    },
    preloadedState,

})
//- Middleware - runs after every dispatched action -
store.subscribe(()=>{
    saveState(store.getState())
})
