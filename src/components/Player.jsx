function Player({player}) {
    return (
        <div className="p-4 md:p-12 flex flex-col items-center justify-center gap-6 select-none">
            <div className="text-6xl font-bold">{player.score}</div>
            <div className="text-3xl">{player.name}</div>
            <div className={"h-14 w-14 border-2 border-black aspect-square rounded-full shadow-md " 
                + (player.hasExtension ? "bg-green-500" : "bg-red-500")}></div>
        </div>
    );
}

export default Player;