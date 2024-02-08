import { useState } from 'react'

import GameDisplay from './GameDisplay';
import InputForm from './InputForm';

function App() {
  const [playerNames, setPlayerNames] = useState([]);

  if (playerNames.length > 0) {
    return <GameDisplay playerNames={playerNames}></GameDisplay>
  } else {
    return <InputForm setPlayerNames={setPlayerNames}></InputForm>
  }
}

export default App;
