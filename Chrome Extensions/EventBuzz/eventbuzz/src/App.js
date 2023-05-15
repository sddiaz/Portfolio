import './App.css';
import { useState, useEffect } from 'react';
import axios, * as others from 'axios';
import Events from "./components/Events.js"

const App = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/events'
    };

    axios.get(options.url)
      .then(response => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
        <div className="mainDiv">
            <span>
                <input placeholder="Where to? (City, State, Country...)" type="text" id="userInput"></input>
                <button id="searchBtn">
                    🔍
                </button>
            </span>
            <ol id="list">
            </ol>
      </div>
  );
};

export default App;