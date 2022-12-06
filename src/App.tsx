import { useState } from 'react';
import myUseState from "./myUseState";
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const [myCount, mySetCount] = myUseState(0);

  function handleMyCountBtnClick() {

    console.log("In handleMyCountBtnClick()");
    
    mySetCount((myCount: number) => myCount + 1);
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>myUseState</h1>
      <p>Implementing my own useState() so I learn more!</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={handleMyCountBtnClick} className="adjacentButton">
          myCount is {myCount}
        </button>
        
      </div>
    </div>
  )
}

export default App
