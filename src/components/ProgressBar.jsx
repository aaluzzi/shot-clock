function ProgressBar({className, percentage, hasExtension}) {
    return (
        <div className={className + " bg-gray-800"}>
            <div className={"h-full rounded-md transition-all " + (hasExtension ? "bg-green-400" : (percentage <= 100 ? "bg-red-600" : "bg-amber-500"))} style={{width: `${Math.min(100, percentage)}%`}}></div>
        </div>
    )
}

export default ProgressBar;