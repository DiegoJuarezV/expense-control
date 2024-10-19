import { useBudgetStates } from "../Context/BudgetContext";
import { categories } from "../data/categories";

const FilteredCategory = () => {
  const { dispatch } = useBudgetStates();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'ADD_FILTERED_CATEGORY', payload: { id: e.target.value } })
  }

  return (
    <section className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar Gastos</label>
          <select 
            id="category"
            className="bg-slate-200 p-3 flex-1 rounded"
            onChange={handleChange}
          >
            <option value="">-- Todas las categorias --</option>
            {categories.map(category => (
              <option 
                value={category.id}
                key={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </section>
  )
}

export default FilteredCategory;