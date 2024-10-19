type ErrorMessageProps = {
  allowedExpense: boolean
}

const ErrorMessage = ({ allowedExpense } : ErrorMessageProps) => {
  return (
    <p className="bg-red-500 text-white font-bold text-lg text-center">
      {allowedExpense 
        ? "El gasto excede el presupuesto disponible." 
        : "Verifique que no haya campos vacios y que el monto sea mayor a cero."}
    </p>
  )
}

export default ErrorMessage;