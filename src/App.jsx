import { useState, useEffect } from 'react'

import ControllerGameDisplay from './ControllerGameDisplay';
import CreateForm from './CreateForm';
import StartMenu from './StartMenu';
import { getSocket } from './socket';
import ListenerGameDisplay from './ListenerGameDisplay';


function getRoomCode() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('c');
  return code;
}

function App() {
  const socket = getSocket();
  const [roomCode, setRoomCode] = useState(getRoomCode());
  const [socketState, setSocketState] = useState(null);
  const [role, setRole] = useState('');
  const [initialData, setInitialData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (roomCode) {
      console.log("Connecting with socket");
      socket.connect();

      socket.on('connect', () => {
        setSocketState(socket);
        console.log("connected, joining room " + roomCode);
        if (initialData) {
          socket.emit('join', roomCode, initialData);
        } else {
          socket.emit('join', roomCode);
        }
      })

      socket.on('receive-role', (role) => {
        setRole(role) 
      });

      socket.on('receive-data', initialData => {
        setInitialData(initialData);
      });

      return () => {
        socket.off('connect');
        socket.off('receive-role');
        socket.off('receive-data');
      }
    }
  }, [roomCode]);

  if (role === 'controller' && initialData) {
    return <ControllerGameDisplay socket={socketState?.connected ? socketState : null} initialData={initialData} />
  } else if (role === 'listener' && initialData) {
    return <ListenerGameDisplay socket={socketState} initialData={initialData} />
  } else if (showForm) {
    return <CreateForm setShowForm={setShowForm} setRoomCode={setRoomCode} setInitialData={setInitialData} />
  } else {
    return <StartMenu socket={socketState} setRoomCode={setRoomCode} setShowForm={setShowForm} />
  }
}

export default App;
