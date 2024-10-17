export type BudgetActions = 
  { type: 'ADD_BUDGET', payload: { budget: number }} |
  { type: 'SHOW_MODAL' } |
  { type: 'CLOSE_MODAL' }

export type BudgetState = {
  budget: number
  modal: boolean
}

export const initialState = {
  budget: 0,
  modal: false
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
  switch (action.type) {
    case "ADD_BUDGET": 
      return { ...state, budget: action.payload.budget }
    case "SHOW_MODAL":
      return { ...state, modal: true }
    case "CLOSE_MODAL":
      return { ...state, modal: false }
  }
}