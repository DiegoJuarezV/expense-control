import { createContext, ReactNode, useContext, useReducer } from "react";
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer";

type BudgetStatesProps = {
  state: BudgetState
  dispatch: React.Dispatch<BudgetActions>
}

type BudgetContextProps = {
  children: ReactNode
}

const BudgetStates = createContext<BudgetStatesProps>(null!);

const BudgetContext = ({ children } : BudgetContextProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetStates.Provider value={{ state, dispatch }}>
      {children}
    </BudgetStates.Provider>
  )
}

export default BudgetContext;

export const useBudgetStates = () => useContext(BudgetStates);