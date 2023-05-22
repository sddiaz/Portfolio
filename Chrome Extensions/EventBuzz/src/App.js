import './App.css';
import { useState, useEffect, CSSProperties } from 'react';
import axios, * as others from 'axios';
import Error from './components/Error';
import Settings from './components/Settings';
import Event from "./components/Event.js"
import Title from './components/Title';
import { PropagateLoader } from 'react-spinners';
import { v4 as uuidv4 } from 'uuid';
// TODO: clear input, create and map Event element, add more filters / search stuff...
const App = () => {
  const loaderCSS = {
    display: "block",
    alignItems: "center",
    margin: "0 auto",
    borderColor: "red",
  };
  // -- VARIABLES -- \\ 
  const [listItems, setListItems] = useState(null);
  const [events, setEvents] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [previousInput, setPreviousInput] = useState(userInput);
  const [start, setStart] = useState(0);
  const [error, setError] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [max, setMax] = useState(0); // maximum pages reach (for loading on page flip)
  const [toggleFavorites, setToggleFavorites] = useState(false);
  // -- FUNCTIONS -- \\
  function grabEvents(event) {
    if (event) {
      event.preventDefault();
    }
    if (userInput) {
      if (userInput != previousInput) {
        setLoading(true);
      }
      setPreviousInput(userInput);
      const options = {
        method: 'GET',
        url: 'https://events-api-kappa.vercel.app/',
        params: {
          q: `${userInput}`,
          no_cache: false,
          start: start,
        } 
      }
      axios.request(options).then((response) => {
        setEvents(response.data);
      })
    }
    // If no input, show error for 5 seconds.
    else {
      setError("Please Enter Something First.");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }
  // Decrement Results by 10 (previous page)
  function leftClick() {
    if (start != 0 && userInput) {
      setStart(start - 10);
    }
    else if (!error) {
      setError("Cannot Go Back.");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }
  // Increment Results by 10 (next page)
  function rightClick() {
    if (userInput) {
      if (start > max) {
        setLoading(true);
      }
      setStart(start + 10);    
      setMax(Math.max(max, start));
    }
    else if (!error) {
        setError("Please Search First.");
        setTimeout(() => {
          setError(false);
        }, 3000);
    }
  }
  function sort() {
    if (events) {
        if (!sorted) {
          setEvents(events.sort(function(a, b) {
            var dateA = new Date("2000 " + a.date.start_date);
            var dateB = new Date("2000 " + b.date.start_date);
            return dateB - dateA;
          }))
          setListItems(events.map(item => {
            return (
                <div>
                <Event 
                {...item}
                />
                </div>
            )
           }) );
           setSorted(true);
        }
      else {
        setEvents(events.sort(function(a, b) {
          var dateA = new Date("2000 " + a.date.start_date);
          var dateB = new Date("2000 " + b.date.start_date);
          return dateA - dateB;
        }))
        setListItems(events.map(item => {
          return (
              <div>
              <Event 
              {...item}
              />
              </div>
          )
        }) );
        setSorted(false);
      }
    }
    else if (!error) {
      setError("Please Search before Sorting.");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }
  function showFavorites(){
    if (toggleFavorites) {
      setToggleFavorites(false);
    }
    else {
        setToggleFavorites(true);
        const favorites = JSON.parse(localStorage.getItem('favorites'));
    }
  }
  // Show Events When Changed
  useEffect(() => {
    if (events) {
      setLoading(false);
      console.log(JSON.stringify({events}));
      setListItems(events.map(item => {
      const eventID = uuidv4(); 
        return (
            <div>
            <Event 
            {...item}
            id={`${item.title}_${item.date.when}_${item.address.join('_')}`}
            />
            </div>
        )
    }) );
    }
  }, [events]);
  // Grab Events when Start Changes (Page Turn)
  useEffect (() => {
    grabEvents();
  }, [start])
  // -- LAYOUT -- \\
  return (
    <div className="mainDiv">
      <div className="wrapper">
        <Error message={error ? error : ""} />
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
          <Settings onLeftClick={leftClick} 
                    onRightClick={rightClick}
                    onSort={sort} 
                    onFavoriteClick={showFavorites}/>
        </div>
        
        <div className="listDiv">
        {loading && 
        <div className="loader">
      <PropagateLoader
        cssOverride={loaderCSS} 
         color="var(--accent)" />
      </div>}
          {!toggleFavorites && listItems}
        </div>
      </div>
    </div>
  );
};

export default App;