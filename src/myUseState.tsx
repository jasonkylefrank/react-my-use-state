import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import reactRoot from "./reactRoot.tsx";



function getMyUseState() {
  let state: any;

  function setState(newValOrFunc: any) {
    if (typeof newValOrFunc === 'function') {
      // console.log("Function found");
      state = newValOrFunc(state);
    } else {
      state = newValOrFunc;
    }
    console.log("After setting 'state': ", state);
    // Have to manually call render() to make it reactive
    reactRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  }

  return function myUseState(initialVal: any) {
    if (state === undefined) {
      state = initialVal;
    }

    console.log("In myUseState, state: ", state);
    
    return [state, setState];
  }
}

export default getMyUseState();