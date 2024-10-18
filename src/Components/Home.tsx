import { useMemo } from "react";
import { useBudgetStates } from "../Context/BudgetContext";
import Form from "./Form";
import BudgetTracker from "./BudgetTracker";
import ExpenseModal from "./ExpenseModal";
import ExpenseList from "./ExpenseList";

const Home = () => {
  const { state } = useBudgetStates();

  const flag = useMemo(() => state.budget > 0, [state.budget]);

  return (
    <>
      <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {flag ? <BudgetTracker /> : <Form />}
      </section>

      {flag && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default Home;