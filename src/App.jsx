import { useState, useEffect } from 'react'

import ControllerGameDisplay from './ControllerGameDisplay';
import InputForm from './InputForm';
import { socket } from './socket';
import ListenerGameDisplay from './ListenerGameDisplay';


function getRoomCode() {
  const url = window.location.href.split('/');
  const lastPart = url[url.length - 1];
  if (lastPart !== 'localhost:5173' || lastPart !== 'shot-clock.netlify.app') {
    return lastPart;
  }
  return '';
}

function App() {
  const [playerNames, setPlayerNames] = useState([]);
  const [roomCode, setRoomCode] = useState(getRoomCode());
  const [socketState, setSocketState] = useState(null);
  const [isController, setIsController] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (roomCode.length > 0) {
      console.log("Connecting with socket");
      socket.connect();

      socket.on('connect', () => {
        setSocketState(socket);
        console.log("connected, joining room " + roomCode)
        socket.emit('join', roomCode);
      })

      socket.on('confirm-controller', () => {
        console.log('controller confirmed');
        setIsController(true);
        socket.emit('update-players', [
          {
              name: playerNames[0],
              hasExtension: true,
              score: 0,
          },
          {
              name: playerNames[1],
              hasExtension: true,
              score: 0,
          }])
      });

      socket.on('receive-data', initialData => {
        setInitialData(initialData);
        console.log(initialData);
      });

      return () => {
        socket.off('connect');
        socket.off('confirm-controller');
        socket.off('receive-data');
      }
    }
  }, [roomCode]);

  if (isController && playerNames.length > 0) {
    return <ControllerGameDisplay socket={socketState?.connected ? socketState : null} playerNames={playerNames} />
  } else if (initialData) {
    return <ListenerGameDisplay socket={socketState} initialData={initialData} />
  } else {
    return <InputForm setRoomCode={setRoomCode} setPlayerNames={setPlayerNames} />
  }
}

export default App;
