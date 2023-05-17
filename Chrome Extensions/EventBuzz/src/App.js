import './App.css';
import { useState, useEffect } from 'react';
import axios, * as others from 'axios';
import Error from './components/Error';
import Settings from './components/Settings';
import Event from "./components/Event.js"
import Title from './components/Title';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

// TODO: clear input, create and map Event element, add more filters / search stuff...
const App = () => {
  // -- VARIABLES -- \\ 
  const [listItems, setListItems] = useState(null);
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
          q: `${userInput}`,
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
      console.log(JSON.stringify({events}));
      setListItems(events.map(item => {
        return (
            <div>
            <Event 
            {...item}
            />
            </div>
        )
    }) );
    }
  }, [events]);

  // -- LAYOUT -- \\
  return (
    <div className="mainDiv">
      <div className="wrapper">
        <Error message={hasError ? "Please Enter a Location" : ""} />
        <Title/>
        <form className="mainDiv" onSubmit={grabEvents}>
          <span className="event--search">
            <input 
              className="input-el"
              placeholder="Search by location, group, etc..."
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit" id="searchBtn">
              🔍
            </button>
          </span>
        </form>
        <div>
          <Settings/>
        </div>
        <div className="listDiv">
          {listItems}
        </div>
      </div>
    </div>
  );
};

export default App;