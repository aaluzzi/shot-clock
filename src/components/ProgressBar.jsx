function ProgressBar({className, percentage, hasExtension}) {
    return (
        <div className={className + " bg-zinc-700 "}>
            <div className={"h-full rounded-md shadow-lg transition-all " + (hasExtension ? "bg-green-500" : (percentage <= 100 ? "bg-red-500" : "bg-amber-500"))} style={{width: `${Math.min(100, percentage)}%`}}></div>
        </div>
    )
}

export default ProgressBar;