function ProgressBar({className, percentage}) {
    return (
        <div className={className + " bg-gray-700"}>
            <div className="h-full rounded-md bg-red-600 " style={{width: `${Math.min(100, percentage)}%`}}></div>
        </div>
    )
}

export default ProgressBar;