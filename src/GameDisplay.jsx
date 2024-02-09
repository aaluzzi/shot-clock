import { useState, useEffect } from 'react'
import CountdownTimer from './components/CountdownTimer';
import Player from './components/Player';
import TurnIndicator from './components/TurnIndicator';
import Button from './components/Button';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

function GameDisplay({playerNames}) {
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
      const [countdown, setCountdown] = useState(30);
      const [paused, setPaused] = useState(true);
    
      const switchTurns = () => {
        setCountdown(30);
        setTurnIndex(turnIndex => (turnIndex + 1) % 2);
      };
    
      const toggleTimer = (e) => {
        setPaused(prevPaused => !prevPaused);
        e.stopPropagation();
      }
    
      const onScreenClick = (e) => {
        if (!paused) {
          switchTurns();
        }
        toggleTimer(e);
      }
    
      const extend = (e) => {
        e.stopPropagation();
        const newPlayers = [...players];
        newPlayers[turnIndex].hasExtension = false;
        setPlayers(newPlayers);
        setCountdown(prevCountdown => prevCountdown + 30);
      };
    
      const reset = (e) => {
        e.stopPropagation();
        setPaused(true);
        setCountdown(30);
      }
    
      const restart = (e) => {
        reset(e);
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
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, [paused, countdown]);
    
      return (
          <div onClick={(e) => onScreenClick(e)} className="h-screen m-auto flex flex-col items-center justify-center">
            <div className="select-none text-[25vw] drop-shadow-xl">{countdown}</div>
            <div className="absolute top-0 left-0 right-0 flex p-4">
              <div className="flex align-center gap-2">
                <MinusIcon className="h-12" onClick={(e) => decreaseScore(e, 0)} />
                <PlusIcon className="h-12" onClick={(e) => increaseScore(e, 0)} />
              </div>
              <div className='flex-grow flex justify-center gap-2'>
                <Button onClick={toggleTimer} label={paused ? "Play" : "Pause"} />
                <Button onClick={reset} label="Reset" />
                <Button onClick={extend} label="Extend" disabled={!players[turnIndex]?.hasExtension} />
                <Button onClick={restart} label="Restart" />
              </div>
              <div className="flex gap-2">
                <MinusIcon className="h-12" onClick={(e) => decreaseScore(e, 1)} />
                <PlusIcon className="h-12" onClick={(e) => increaseScore(e, 1)} />
              </div>
            </div>
            
            <div className='absolute left-0 bottom-0 right-0 flex'>
              <Player className="" player={players[0]}/>
              <div className={"flex-grow flex items-center" + (turnIndex === 1 ? " rotate-180" : "")}>
                <TurnIndicator />
              </div>
              <Player className="" player={players[1]}/>
            </div>
           
          </div>
      )
}

export default GameDisplay;