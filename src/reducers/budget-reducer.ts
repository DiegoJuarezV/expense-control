import { v4 as uuidv4 } from 'uuid'
import { Category, DraftExpense, Expense } from "../types"

const expenseLs = JSON.parse(localStorage.getItem("expense") || "[]")
const budgetLs = JSON.parse(localStorage.getItem("budget") || "0")

export type BudgetActions = 
  { type: 'ADD_BUDGET', payload: { budget: number }} |
  { type: 'SHOW_MODAL' } |
  { type: 'CLOSE_MODAL' } |
  { type: 'ADD_EXPENSE', payload: { expense: DraftExpense }} |
  { type: 'REMOVE_EXPENSE', payload: { id: Expense['id'] }} |
  { type: 'GET_EXPENSE_BY_ID', payload: { id: Expense['id'] }} |
  { type: 'UPDATE_EXPENSE', payload: { expense: Expense }} |
  { type: 'ADD_FILTERED_CATEGORY', payload: { id: Category['id'] }} |
  { type: 'RESTART_APP' }

export type BudgetState = {
  budget: number
  modal: boolean
  expenses: Expense[]
  editedExpense: Expense['id']
  currentCategory: Category['id']
}

export const initialState = {
  budget: budgetLs,
  modal: false,
  expenses: expenseLs,
  editedExpense: '',
  currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense) : Expense => {
  return { ...draftExpense, id: uuidv4() }
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
  switch (action.type) {
    case "ADD_BUDGET": 
      return { ...state, budget: action.payload.budget }
    case "SHOW_MODAL":
      return { ...state, modal: true }
    case "CLOSE_MODAL":
      return { ...state, modal: false, editedExpense: '' }
    case "ADD_EXPENSE": {
      const expense = createExpense(action.payload.expense)
      return { ...state, expenses: [ ...state.expenses, expense ], modal: false }
    }
    case "REMOVE_EXPENSE": {
      const expenseFiltered = state.expenses.filter(expense => expense.id !== action.payload.id);
      return { ...state, expenses: expenseFiltered }
    }
    case "GET_EXPENSE_BY_ID":
      return { ...state, editedExpense: action.payload.id, modal: true }
    case "UPDATE_EXPENSE": {
      const updatedExpense = state.expenses.map(expense => expense.id === action.payload.expense.id
        ? action.payload.expense : expense
      )
      return { ...state, expenses: updatedExpense, modal: false, editedExpense: '' }
    }
    case "RESTART_APP":
      return { ...state, budget: 0, expenses: [] }
    case "ADD_FILTERED_CATEGORY":
      return { ...state, currentCategory: action.payload.id }
  }
}