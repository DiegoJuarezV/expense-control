import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudgetStates } from "../Context/BudgetContext";

const initialState: DraftExpense = {
  expenseName: '',
  amount: 0,
  category: '', 
  date: new Date()
}

const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>(initialState)

  const [error, setError] = useState(false);

  const { dispatch } = useBudgetStates();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumeric = ['amount'].includes(name);
    setExpense({ ...expense, [name]: isNumeric ? +value : value });
    setError(false);
  }

  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value })
    setError(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes('')) {
      setError(true)
      return
    } 
    dispatch({ type: 'ADD_EXPENSE', payload: { expense } })
    setExpense(initialState)
    setError(false)
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-2xl text-center font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>

      {error && <ErrorMessage />}

      <div className="flex flex-col gap-2">
        <label 
          htmlFor="expenseName"
          className="text-xl"
        >
          Nombre Gasto:
        </label>
        <input 
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2" 
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label 
          htmlFor="amount"
          className="text-xl"
        >
          Monto:
        </label>
        <input 
          type="number"
          id="amount"
          placeholder="Añade la cantidad del gasto ej. 300"
          className="bg-slate-100 p-2" 
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label 
          htmlFor="category"
          className="text-xl"
        >
          Categoria:
        </label>
        <select 
          id="category"
          className="bg-slate-100 p-2" 
          name="category"
          value={expense.category}
          onChange={handleChange}
        > 
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label 
          htmlFor="amount"
          className="text-xl"
        >
          Fecha Gasto:
        </label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input 
        type="submit"
        className="bg-blue-600 cursor-pointer hover:bg-blue-400 w-full p-2 text-white uppercase 
          font-bold rounded-lg" 
        value={'Registrar Gasto'}
      />
    </form>
  )
}

export default ExpenseForm;