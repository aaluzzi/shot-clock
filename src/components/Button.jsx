function Button({ className, icon, onClick, label, disabled }) {
    return (
        <button disabled={disabled} onClick={onClick} className={className + " h-12 flex align-center justify-center gap-1.5 rounded-lg shadow-sm border border-transparent px-4 py-2.5 font-medium bg-gray-900 text-white cursor-pointer transition-colors duration-200 hover:border-indigo-500 focus:outline-none select-none"}>
            {label ? <span className="hidden md:block">{label}</span> : null}
            {icon}
        </button>
    )
}

export default Button;