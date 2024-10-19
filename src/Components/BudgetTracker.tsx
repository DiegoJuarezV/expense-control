import { useBudgetStates } from "../Context/BudgetContext";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import AmountDisplay from "./AmountDisplay";
import 'react-circular-progressbar/dist/styles.css'

const BudgetTracker = () => {
  const { state, dispatch, totalExpenses, availableAmount } = useBudgetStates();
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

  const resetBtn = () => {
    dispatch({ type: 'RESTART_APP' })
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar 
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#DC2626' : '#3b82f6',
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: percentage === 100 ? '#DC2626' : '#3b82f6'
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 hover:bg-pink-500 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={resetBtn}
        >
          Reiniciar App
        </button>

        <AmountDisplay 
          label="Presupuesto"
          amount={state.budget}
        />

        <AmountDisplay 
          label="Disponible"
          amount={availableAmount}
        />

        <AmountDisplay 
          label="Gastado"
          amount={totalExpenses}
        />
      </div>
    </section>
  )
}

export default BudgetTracker;