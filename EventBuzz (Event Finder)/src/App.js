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
  const [events, setEvents] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [previousInput, setPreviousInput] = useState(userInput);
  const [start, setStart] = useState(0);
  const [error, setError] = useState(false);
  const [sorted, setSorted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [max, setMax] = useState(0); // maximum pages reach (for loading on page flip)
  const [toggleFavorites, setToggleFavorites] = useState(false);
  // -- FUNCTIONS -- \\
  function grabEvents(event) {
    if (event) {
      event.preventDefault();
    }
    if (userInput) {
      setEmpty(false);
      setToggleFavorites(false);
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
        setToggleFavorites(false);
        setEvents(response.data);
      })
    }
    // If no input, show error for 5 seconds.
    else {
      if (event && event.type === 'submit') {
        setError("Please Enter Something First.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
  }
  // Decrement Results by 10 (previous page)
  function leftClick() {
    if (toggleFavorites) {
      setError("Can't flip through favorites.");
        setTimeout(() => {
          setError(false);
        }, 3000);
    }
    else {
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
  }
  // Increment Results by 10 (next page)
  function rightClick() {
    if (toggleFavorites) {
      setError("Can't flip through favorites.");
        setTimeout(() => {
          setError(false);
        }, 3000);
    }
    else {
      if (userInput) {
        if (start >= max) {
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
  }
  function sort() {
    if (events && !toggleFavorites) {
        if (!sorted) {
          setEvents(events.sort(function(a, b) {
            var dateA = new Date("2000 " + a.date.start_date);
            var dateB = new Date("2000 " + b.date.start_date);
            return dateB - dateA;
          }))
          setEventList(events.map(item => {
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
        setEventList(events.map(item => {
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
    else if (favorites && toggleFavorites) {
      if (!sorted) {
        setFavorites(favorites.sort(function(a, b) {
          var dateA = new Date("2000 " + a.date.start_date);
          var dateB = new Date("2000 " + b.date.start_date);
          return dateB - dateA;
        }))
        setFavoriteList(favorites.map(item => {
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
      setFavorites(favorites.sort(function(a, b) {
        var dateA = new Date("2000 " + a.date.start_date);
        var dateB = new Date("2000 " + b.date.start_date);
        return dateA - dateB;
      }))
      setFavoriteList(favorites.map(item => {
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
        const favs = JSON.parse(localStorage.getItem('favorites'));
        if (favs.length !== 0) {
          setEmpty(false);
          setToggleFavorites(true);
          setFavorites(favs);
        }
        else {
          setEmpty(true);
        }
      }
  }
  // Show Events When Changed
  useEffect(() => {
    if (events) {
      setLoading(false);
      setEventList(events.map(item => {
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
  // Update Favorites
  useEffect(() => {
  if (favorites.length !== 0) {
    setFavoriteList(favorites.map(item => {
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
  }, [favorites])
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
              placeholder="Events in Las Vegas, Music Fests in London..."
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
          {/* Switch Between Favorites and Events */}
          {empty && <div className="empty">Favorite something first :)</div>}
          {toggleFavorites && favoriteList}
          {!toggleFavorites && eventList}
        </div>
      </div>
    </div>
  );
};

export default App;