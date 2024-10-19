import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer";

type BudgetStatesProps = {
  state: BudgetState
  dispatch: React.Dispatch<BudgetActions>
  totalExpenses: number
  availableAmount: number
}

type BudgetContextProps = {
  children: ReactNode
}

const BudgetStates = createContext<BudgetStatesProps>(null!);

const BudgetContext = ({ children } : BudgetContextProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => 
    expense.amount + total, 0), [state.expenses])

  const availableAmount = useMemo(() => 
    state.budget - totalExpenses, [state.budget, totalExpenses])

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(state.expenses))
  }, [state.expenses])

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(state.budget))
  }, [state.budget])

  return (
    <BudgetStates.Provider value={{ state, dispatch, totalExpenses, availableAmount }}>
      {children}
    </BudgetStates.Provider>
  )
}

export default BudgetContext;

export const useBudgetStates = () => useContext(BudgetStates);