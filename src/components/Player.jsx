function Player({player}) {
    return (
        <div className="p-4 md:p-12 min-w-[15%] flex flex-col items-center justify-center gap-6 select-none">
            <div className="leading-none text-[4vw] font-bold">{player.score}</div>
            <div className="leading-none text-[4vw]">{player.name}</div>
            <div className={"h-14 w-14 border-2 border-black aspect-square rounded-full shadow-md " 
                + (player.hasExtension ? "bg-green-500" : "bg-red-500")}></div>
        </div>
    );
}

export default Player;