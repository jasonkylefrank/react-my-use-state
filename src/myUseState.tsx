import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import reactRoot from "./reactRoot.tsx";


// This one only handles a single state variable for a component
function getMyUseStateSingle() {
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

  return function myUseStateSingle(initialVal: any) {
    if (state === undefined) {
      state = initialVal;
    }

    console.log("In myUseState, state: ", state);
    
    return [state, setState];
  }
}

// This one handles multiple state variables for a component
function getMyUseState() {
  // The index before any state values have been added
  const preValueIndex = -1;
  let stateIndex = preValueIndex;
  const stateValues: any[] = [];

  function setState(newValOrFunc: any, index: number) {
    if (typeof newValOrFunc === 'function') {
      // console.log("Function found");
      stateValues[index] = newValOrFunc(stateValues[index]);
    } else {
      stateValues[index] = newValOrFunc;
    }
    console.log("After setting 'stateValues[index]': ", stateValues[index]);
    // Have to manually call render() to make it reactive
    reactRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    // Reset the index position
    stateIndex = preValueIndex;
  }

  return function myUseState(initialVal: any) {
    stateIndex++;

    if (stateValues[stateIndex] === undefined) {
      stateValues[stateIndex] = initialVal;
    }

    // Closure function so we "lock in" the stateIndex to the respective state variable
    const getSetStateWithIndexAssigned = (index: number) => (newValOrFunc: any) => setState(newValOrFunc, index);
    
    // This works.  But consider refactoring it for better readability
    // const setStateForIndex = ((index) => (newValOrFunc: any) => setState(newValOrFunc, index))(stateIndex);

    console.log("In myUseState, stateValues: ", stateValues);
    
    return [stateValues[stateIndex], getSetStateWithIndexAssigned(stateIndex)];
  }
}

export default getMyUseState();