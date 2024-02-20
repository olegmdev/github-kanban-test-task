import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { TodoBoard } from './components/TodoBoard/TodoBoard';

function App() {

  const [userID, setUserID] = useState<number | undefined>(undefined);

  return (
    <div className='App'>
      <Header handleID={setUserID}/>
      {userID && 
      <TodoBoard userID={userID}/>
      }
    </div>
  );
}

export default App;
