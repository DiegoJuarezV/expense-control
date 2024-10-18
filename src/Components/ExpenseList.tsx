import { useMemo } from "react";
import { useBudgetStates } from "../Context/BudgetContext";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {
  const { state } = useBudgetStates();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])

  return (
    <section className="mt-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold text-center">No Hay Gastos Registrados</p>
      ) : (
        <>
          <p className="text-gray-700 text-2xl font-bold my-5">Listado de Gastos</p>
          {state.expenses.map(expense => (
            <ExpenseDetail key={expense.id} details={expense} />
          ))}
        </>
      )}
    </section>
  )
}

export default ExpenseList;