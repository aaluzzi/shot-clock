import ProgressBar from "./ProgressBar";


function PlayerCard({onClick, player, countdown, mirrored, isTurn}) {
    return (
        <div onClick={onClick} className={"p-6 md:p-10 min-w-full sm:max-w-[650px] sm:min-w-[350px] flex-1 bg-gray-900 rounded-3xl flex flex-col items-center justify-center gap-4 md:gap-6 select-none transition-[outline] outline outline-white" + (isTurn ? " outline-4" : " outline-0")}>
            <div className={"w-full flex gap-8 items-center justify-end flex-row-reverse" + (mirrored ? " md:flex-row" : "")}>
                <div className="leading-none font-bold text-[48px] md:text-[96px] lg:text-[128px]">{player.score}</div>               
                <div className="flex flex-1 justify-center leading-none text-[32px] md:text-[72px] lg:text-[90px]">{player.name}</div> 
            </div>
            
            <div className={"flex w-full"}>
                <div className={"p-2 aspect-square rounded-md shadow-md flex items-center justify-center transition-colors text-lg md:text-3xl " 
                    + (player.hasExtension ? "bg-green-600" : "bg-red-800")}>EX</div>
                <ProgressBar className="flex-1 rounded-md h-full" percentage={isTurn ? Math.floor(countdown / 30 * 100) : 0} /> 
            </div>
           
        </div>
    );
}

export default PlayerCard;