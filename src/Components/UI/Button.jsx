

function Button({ children, onClick, variant = "primary", disabled = false, type = "button"}){

  const baseStyles = 
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white",
    danger: "bg-red-600 text-white hover:bg-red-700"
  }

  return(
    <button
    type={type}
    className={`${baseStyles} ${variants[variant]}`}
    onClick={onClick}
    disabled={disabled}
    >
      {children}

    </button>

  )
}

export default Button;