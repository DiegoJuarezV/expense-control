import { useMemo } from "react";
import { useBudgetStates } from "../Context/BudgetContext";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {
  const { state } = useBudgetStates();
  
  const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => 
    expense.category === state.currentCategory) : state.expenses;
    
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])
  
  return (
    <section className="mt-10 bg-white shadow-lg rounded-lg p-5">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold text-center">No Hay Gastos Registrados</p>
      ) : (
        <>
          <p className="text-gray-700 text-2xl font-bold my-5">Listado de Gastos</p>
          {filteredExpenses.map(expense => (
            <ExpenseDetail key={expense.id} details={expense} />
          ))}
        </>
      )}
    </section>
  )
}

export default ExpenseList;