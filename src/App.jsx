import { useState, useEffect } from 'react'

import ControllerGameDisplay from './ControllerGameDisplay';
import InputForm from './InputForm';
import StartMenu from './StartMenu';
import { socket } from './socket';
import ListenerGameDisplay from './ListenerGameDisplay';


function getRoomCode() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('c');
  return code;
}

function App() {
  const [playerNames, setPlayerNames] = useState([]);
  const [roomCode, setRoomCode] = useState(getRoomCode());
  const [socketState, setSocketState] = useState(null);
  const [isController, setIsController] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (roomCode) {
      console.log("Connecting with socket");
      socket.connect();

      socket.on('connect', () => {
        setSocketState(socket);
        console.log("connected, joining room " + roomCode);
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
  } else if (showForm) {
    return <InputForm setRoomCode={setRoomCode} setPlayerNames={setPlayerNames} />
  } else {
    return <StartMenu setRoomCode={setRoomCode} setShowForm={setShowForm} />
  }
}

export default App;
