import { useState, useEffect } from 'react'
import PlayerCard from './components/PlayerCard';

function ListenerGameDisplay({ socket, initialData }) {
    const timerWarnAudio = new Audio('./timer_warn.wav');
    const timerEndAudio = new Audio('./timer_end.wav');

    const [players, setPlayers] = useState(initialData.players);
    const [turnIndex, setTurnIndex] = useState(initialData.turnIndex);
    const [countdown, setCountdown] = useState(initialData.countdown);
    const [paused, setPaused] = useState(initialData.paused);

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

        socket.on('update-paused', paused => {
            setPaused(paused);
        });

        return () => {
            socket.off('update-players');
            socket.off('update-turn');
            socket.off('update-countdown');
            socket.off('update-paused');
        }
    }, []);


    const toggleTimer = (e) => {
        setPaused(!paused);
        e.stopPropagation();
    }

    const extend = (e) => {
        e.stopPropagation();
        if (players[turnIndex].hasExtension) {
            const newPlayers = [...players];
            newPlayers[turnIndex].hasExtension = false;
            setPlayers(newPlayers);
            setCountdown(countdown + 30);
        }
    };

    const reset = (e) => {
        e.stopPropagation();
        setPaused(true);
        setCountdown(30);
    }

    const restart = (e) => {
        e.stopPropagation();
        setPaused(true);
        setCountdown(60);
        const newPlayers = [...players];
        newPlayers[0].hasExtension = true;
        newPlayers[1].hasExtension = true;
        setPlayers(newPlayers);
    }

    /*useEffect(() => {
        if (paused || countdown <= 0) return;

        const intervalId = setInterval(() => {
            setCountdown(countdown - 1);
            if (countdown - 1 == 0) {
                setPaused(true);
                timerEndAudio.play();
            } else if (countdown - 1 <= 5) {
                timerWarnAudio.play();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [paused, countdown]);*/

    if (players) {
        return (
            <div className="h-screen m-auto flex flex-col items-center ">
                <div className={"flex-1 flex items-center select-none font-bold text-[128px] lg:text-[256px]  " + (countdown <= 5 ? "text-red-600" : "")}>
                    {countdown}
                </div>
                <div className='w-full flex flex-wrap p-4 gap-4 justify-between'>
                    <PlayerCard extend={extend} isTurn={turnIndex == 0} player={players[0]} countdown={countdown} />
                    <PlayerCard extend={extend} isTurn={turnIndex == 1} player={players[1]} countdown={countdown} mirrored={true} />
                </div>

            </div>
        )
    } else {
        return <div className="h-screen m-auto flex flex-col items-center "></div>
    }
}

export default ListenerGameDisplay;