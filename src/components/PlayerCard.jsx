import ProgressBar from "./ProgressBar";


function PlayerCard({extend, onClick, player, countdown, mirrored, isTurn}) {
    const onExtendClick = (e) => {
        if (isTurn) {
            extend(e);
        }
    }

    return (
        <div onClick={onClick} className={"p-6 md:p-10 max-w-[550px] min-w-[300px] flex-1 bg-gray-900 shadow-sm rounded-3xl flex flex-col items-center justify-center gap-4 md:gap-6 select-none transition-[outline] outline outline-white" + (isTurn ? " outline-2" : " outline-0")}>
            <div className={"w-full flex gap-4 items-center justify-end flex-row-reverse" + (mirrored ? " sm:flex-row" : "")}>
                <div className="leading-none rounded-2xl font-bold text-[40px] md:text-[56px] lg:text-[72px]">{player.score}</div>               
                <div className="flex flex-1 p-2 rounded-2xl justify-center leading-none text-[24px] md:text-[36px] lg:text-[48px]">{player.name}</div> 
            </div>
            
            <div className={"flex w-full"}>
                <div onClick={onExtendClick} className={"p-1 aspect-square rounded-md shadow-md flex items-center justify-center transition-colors text-lg md:text-2xl " 
                    + (player.hasExtension ? "bg-green-600" : "bg-red-800")}>EX</div>
                <ProgressBar className="flex-1 rounded-md h-full" percentage={isTurn ? Math.floor(countdown / 30 * 100) : 0} /> 
            </div>
           
        </div>
    );
}

export default PlayerCard;