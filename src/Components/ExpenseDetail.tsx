import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList, 
  SwipeableListItem,
  SwipeAction, 
  TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { formatDate } from "../Helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import { useBudgetStates } from "../Context/BudgetContext";

type ExpenseDetailProps = {
  details: Expense
}

const ExpenseDetail = ({ details } : ExpenseDetailProps) => {
  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === details.category)[0], [details])

  const { dispatch } = useBudgetStates();

  const removeBtn = () => {
    dispatch({ type: 'REMOVE_EXPENSE', payload: { id: details.id }})
  }

  const updateExpenseBtn = () => {
    dispatch({ type: 'GET_EXPENSE_BY_ID', payload: { id: details.id }})
  }

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={updateExpenseBtn}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={removeBtn} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-xl p-10 w-full border-b border-gray-300 flex gap-5 items-center">
          <div>
            <img 
              src={`/icono_${categoryInfo.icon}.svg`} 
              alt="Icono de gasto"
              className="w-20" 
            />
          </div>      
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-600">{categoryInfo.name}</p>
            <p className="font-bold text-lg">{details.expenseName}</p>
            <p className="text-slate-700 text-sm">{formatDate(details.date!.toString())}</p>
          </div>

          <AmountDisplay amount={details.amount} />
        </div>
      </SwipeableListItem>  
    </SwipeableList>
  )
}

export default ExpenseDetail;