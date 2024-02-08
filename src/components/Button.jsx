function Button({ className, onClick, label, disabled }) {
    return (
        <button disabled={disabled} onClick={onClick} className={className + " rounded-lg shadow-sm border border-transparent px-5 py-2.5 font-medium bg-gray-900 text-white cursor-pointer transition-colors duration-200 hover:border-indigo-500 focus:outline-none select-none"}>{label}</button>
    )
}

export default Button;