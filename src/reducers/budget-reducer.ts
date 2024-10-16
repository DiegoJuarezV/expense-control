export type BudgetActions = 
  { type: 'ADD_BUDGET', payload: { budget: number }}

export type BudgetState = {
  budget: number
}

export const initialState = {
  budget: 0
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
  switch (action.type) {
    case "ADD_BUDGET": 
      return { ...state, budget: action.payload.budget }
  }
}