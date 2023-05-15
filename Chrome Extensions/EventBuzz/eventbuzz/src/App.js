import './App.css';
import { useState, useEffect } from 'react';
import axios, * as others from 'axios';
import Events from "./components/Events.js"
import Error from './components/Error';


const App = () => {
  // -- VARIABLES -- \\ 
  const [events, setEvents] = useState(null);
  const [hasError, setError] = useState(false);
  const [userInput, setUserInput] = useState('');



  // -- FUNCTIONS -- \\
  function grabEvents(event) {
    event.preventDefault();

    if (userInput) {
      alert(userInput);
    } 
    // If no input, show error for 5 seconds.
    else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }



  // -- LAYOUT -- \\
  return (
    <div className="mainDiv">
      <div>
        <Error message={hasError ? "Please Enter a Location" : ""} />
        <form onSubmit={grabEvents}>
          <span>
            <input
              placeholder="Where to? (City, State, Country...)"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit" id="searchBtn">
              🔍
            </button>
          </span>
        </form>
        <ol id="list"></ol>
      </div>
    </div>
  );
};

export default App;