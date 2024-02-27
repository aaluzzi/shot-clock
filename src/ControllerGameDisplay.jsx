import { useState, useEffect } from 'react'
import PlayerCard from './components/PlayerCard';
import Button from './components/Button';
import { PlusIcon, MinusIcon, PlayIcon, PauseIcon, ArrowPathIcon, ClockIcon, PowerIcon } from '@heroicons/react/24/solid';

function ControllerGameDisplay({ socket, initialData }) {
    const timerWarnAudio = new Audio('./timer_warn.wav');
    const timerEndAudio = new Audio('./timer_end.wav');

    const [players, setPlayersState] = useState(initialData.players);
    const [turnIndex, setTurnIndexState] = useState(initialData.turnIndex);
    const [countdown, setCountdownState] = useState(initialData.countdown);
    const [paused, setPausedState] = useState(true);

    //Socket wrapper functions
    const setPlayers = (players) => {
        setPlayersState(players);
        socket?.emit('update-players', players);
    }
    const setTurnIndex = (turnIndex) => {
        setTurnIndexState(turnIndex);
        socket?.emit('update-turn', turnIndex);
    };
    const setCountdown = (countdown) => {
        setCountdownState(countdown);
        socket?.emit('update-countdown', countdown);
    }
    const setPaused = (paused) => {
        setPausedState(paused);
        socket?.emit('update-paused', paused);
    }

    const onScreenClick = (e) => {
        if (!paused) {
            setCountdown(30);
        }
        setPaused(!paused);
    }

    const onPlayerClick = (e, playerIndex) => {
        e.stopPropagation();
        if (playerIndex !== turnIndex) {
            if (countdown !== 60 || !paused || !players[turnIndex].hasExtension) {
                setCountdown(30);
            }
            setTurnIndex(playerIndex);
            setPaused(true);
        }
    }

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

    const increaseScore = (e, playerIndex) => {
        e.stopPropagation();
        const newPlayers = [...players];
        newPlayers[playerIndex].score++;
        setPlayers(newPlayers);
    }

    const decreaseScore = (e, playerIndex) => {
        e.stopPropagation();
        if (players[playerIndex].score > 0) {
            const newPlayers = [...players];
            newPlayers[playerIndex].score = newPlayers[playerIndex].score - 1;
            setPlayers(newPlayers);
        }
    }

    useEffect(() => {
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
    }, [paused, countdown]);

    if (players) {
        return (
            <div onClick={(e) => onScreenClick(e)} className="h-full flex flex-col items-center ">
                <div className="align-center justify-center flex flex-wrap p-4 gap-2">
                    <Button onClick={toggleTimer} label={paused ? "Play" : "Pause"} icon={paused ? <PlayIcon className="h-full" /> : <PauseIcon className="h-[90%]" />} />
                    <Button onClick={reset} label="Reset" icon={<ArrowPathIcon className="h-full" />} />
                    <Button onClick={extend} label="Extend" icon={<ClockIcon className="h-full" />} />
                    <Button onClick={restart} label="Restart" icon={<PowerIcon className="h-full" />} />
                    <div className="flex bg-zinc-800 rounded-lg">
                        <Button onClick={(e) => decreaseScore(e, turnIndex)} icon={<MinusIcon className="h-full" />} />
                        <Button onClick={(e) => increaseScore(e, turnIndex)} icon={<PlusIcon className="h-full" />} />
                    </div>
                </div>
                <div className={"flex-1 flex items-center select-none font-bold text-[128px] lg:text-[256px]  " + (countdown <= 5 ? "text-red-600" : "")}>
                    {countdown}
                </div>
                <div className='w-full flex flex-wrap p-4 gap-4 justify-between'>
                    <PlayerCard extend={extend} onClick={(e) => onPlayerClick(e, 0)} isTurn={turnIndex == 0} player={players[0]} countdown={countdown} />
                    <PlayerCard extend={extend} onClick={(e) => onPlayerClick(e, 1)} isTurn={turnIndex == 1} player={players[1]} countdown={countdown} mirrored={true}/>
                </div>
    
            </div>
        );
    
    }
    return <></>
}

export default ControllerGameDisplay;