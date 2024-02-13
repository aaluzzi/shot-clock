import { useState, useEffect } from 'react'
import PlayerCard from './components/PlayerCard';
import Button from './components/Button';
import { PlusIcon, MinusIcon, PlayIcon, PauseIcon, ArrowPathIcon, ClockIcon, PowerIcon } from '@heroicons/react/24/solid';

function GameDisplay({ playerNames }) {
    const timerWarnAudio = new Audio('./timer_warn.wav');
    const timerEndAudio = new Audio('./timer_end.wav');

    const [players, setPlayers] = useState([
        {
            name: playerNames[0],
            hasExtension: true,
            score: 0,
        },
        {
            name: playerNames[1],
            hasExtension: true,
            score: 0,
        }]);
    const [turnIndex, setTurnIndex] = useState(0);
    const [countdown, setCountdown] = useState(60);
    const [paused, setPaused] = useState(true);

    const onScreenClick = (e) => {
        if (!paused) {
            setCountdown(30);
        }
        setPaused(paused => !paused);
    }

    const onPlayerClick = (e, playerIndex) => {
        e.stopPropagation();
        if (playerIndex !== turnIndex) {
            setCountdown(30);
            setTurnIndex(playerIndex);
            setPaused(true);
        }
    }

    const toggleTimer = (e) => {
        setPaused(prevPaused => !prevPaused);
        e.stopPropagation();
    }

    const extend = (e) => {
        e.stopPropagation();
        if (players[turnIndex].hasExtension) {
            const newPlayers = [...players];
            newPlayers[turnIndex].hasExtension = false;
            setPlayers(newPlayers);
            setCountdown(prevCountdown => prevCountdown + 30);
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
        const newPlayers = [...players];
        newPlayers[playerIndex].score = Math.max(0, newPlayers[playerIndex].score - 1);
        setPlayers(newPlayers);
    }

    useEffect(() => {
        if (paused || countdown <= 0) return;

        const intervalId = setInterval(() => {
            setCountdown(countdown - 1);
            if (countdown - 1 == 0) {
                timerEndAudio.play();
            } else if (countdown - 1 <= 5) {
                timerWarnAudio.play();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [paused, countdown]);

    return (
        <div onClick={(e) => onScreenClick(e)} className="h-screen m-auto flex flex-col items-center ">
            <div className="align-center justify-center top-0 w-[300px] sm:w-full flex flex-wrap p-4 gap-2">
                <div className="flex order-5 sm:order-none bg-gray-900 rounded-lg">
                    <Button onClick={(e) => decreaseScore(e, 0)} icon={<MinusIcon className="h-full" />} />
                    <Button onClick={(e) => increaseScore(e, 0)} icon={<PlusIcon className="h-full" />} />
                </div>
                <div className="flex-1 hidden sm:block"></div>
                <Button onClick={toggleTimer} label={paused ? "Play" : "Pause"} icon={paused ? <PlayIcon className="h-full" /> : <PauseIcon className="h-[90%]" />} />
                <Button onClick={reset} label="Reset" icon={<ArrowPathIcon className="h-full" />} />
                <Button onClick={extend} label="Extend" icon={<ClockIcon className="h-full" />} />
                <Button onClick={restart} label="Restart" icon={<PowerIcon className="h-full" />} />
                <div className="flex-1 hidden sm:block"></div>
                <div className="flex order-6 sm:order-none bg-gray-900 rounded-lg">
                    <Button onClick={(e) => decreaseScore(e, 1)} icon={<MinusIcon className="h-full" />} />
                    <Button onClick={(e) => increaseScore(e, 1)} icon={<PlusIcon className="h-full" />} />
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
    )
}

export default GameDisplay;