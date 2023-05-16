import './App.css';
import { useState, useEffect } from 'react';
import axios, * as others from 'axios';
import Event from "./components/Event.js"
import Error from './components/Error';

// TODO: clear input, create and map Event element, add more filters / search stuff...
const App = () => {
  // -- VARIABLES -- \\ 
  const [listItem, setListItems] = useState(null);
  const [events, setEvents] = useState(null);
  const [hasError, setError] = useState(false);
  const [userInput, setUserInput] = useState('');



  // -- FUNCTIONS -- \\
  function grabEvents(event) {
    event.preventDefault();

    if (userInput) {
      const options = {
        method: 'GET',
        url: 'https://events-api-kappa.vercel.app/',
        params: {
          q: `Events in ${userInput}`,
          no_cache: false,
        }
      }
      axios.request(options).then((response) => {
        setEvents(response.data);
      })
    }
    // If no input, show error for 5 seconds.
    else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }

  useEffect(() => {
    if (events) {
      alert('Events Found!');
    }
  }, [events]);

  // -- LAYOUT -- \\
  return (
    <div className="mainDiv">
      <div>
        <Error message={hasError ? "Please Enter a Location" : ""} />
        <form onSubmit={grabEvents}>
          <span>
            <input 
              autocomplete="off"
              id="input-el"
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
        
      </div>
    </div>
  );
};

export default App;