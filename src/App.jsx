import { useState, useEffect } from 'react'

import ControllerGameDisplay from './ControllerGameDisplay';
import InputForm from './InputForm';
import { socket } from './socket';


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

  useEffect(() => {
    if (roomCode.length > 0) {
      console.log("Connecting with socket");
      socket.connect();

      socket.on('connect', () => {
        setSocketState(socket);
        console.log("connected, joining room " + roomCode)
        socket.emit('join', roomCode);
      })

      return () => {
        socket.off('connect');
      }
    }
  }, [roomCode]);

  if (playerNames.length > 0) {
    return <ControllerGameDisplay socket={socketState?.connected ? socketState : null} playerNames={playerNames} />
  } else {
    return <InputForm setRoomCode={setRoomCode} setPlayerNames={setPlayerNames} />
  }
}

export default App;
