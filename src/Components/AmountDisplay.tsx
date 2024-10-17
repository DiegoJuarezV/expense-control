import formatCurrency from "../Helpers"

type AmountDisplayProps = {
  label: string
  amount: number
}

const AmountDisplay = ({ label, amount } : AmountDisplayProps) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label} <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}

export default AmountDisplay;