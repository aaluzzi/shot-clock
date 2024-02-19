import { useState, useEffect } from 'react'
import PlayerCard from './components/PlayerCard';

function ListenerGameDisplay({ socket, initialData }) {
    const timerWarnAudio = new Audio('./timer_warn.wav');
    const timerEndAudio = new Audio('./timer_end.wav');

    const [players, setPlayers] = useState(initialData.players);
    const [turnIndex, setTurnIndex] = useState(initialData.turnIndex);
    const [countdown, setCountdown] = useState(initialData.countdown);

    useEffect(() => {
        socket.on('update-players', players => {
            setPlayers(players);
        });

        socket.on('update-turn', turnIndex => {
            setTurnIndex(turnIndex);
        });

        socket.on('update-countdown', countdown => {
            setCountdown(countdown);
            if (countdown === 0) {
                timerEndAudio.play();
            } else if (countdown <= 5) {
                timerWarnAudio.play();
            }
        });

        return () => {
            socket.off('update-players');
            socket.off('update-turn');
            socket.off('update-countdown');
        }
    }, []);

    if (players) {
        return (
            <div className="h-screen m-auto flex flex-col items-center ">
                <div className={"flex-1 flex items-center select-none font-bold text-[150px] lg:text-[300px]  " + (countdown <= 5 ? "text-red-600" : "")}>
                    {countdown}
                </div>
                <div className='w-full flex flex-wrap p-4 gap-4 justify-between'>
                    <PlayerCard extend={() => {}} isTurn={turnIndex == 0} player={players[0]} countdown={countdown} />
                    <PlayerCard extend={() => {}} isTurn={turnIndex == 1} player={players[1]} countdown={countdown} mirrored={true} />
                </div>

            </div>
        )
    } else {
        return <div className="h-screen m-auto flex flex-col items-center "></div>
    }
}

export default ListenerGameDisplay;