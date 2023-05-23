import React from 'react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
const Event = (event) => {
  // -- VARIABLES -- \\ 
  const { title, date, address, link, image, description } = event;
  const { start_date, when } = date;
  const [addressLine1, addressLine2] = address;
  const [popup, setPopup] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const starSource = favorite ? "https://i.ibb.co/1m3Mw8d/star.png" : "https://i.ibb.co/cxd4GqK/image.png";
  // -- FUNCTIONS -- \\ 
  function generateGoogleMapsLink(address) {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsLink = `https://www.google.com/maps?q=${encodedAddress}`;
    return googleMapsLink;
  }
  function configurePopup() {
    if (popup) {
      setPopup(false);
    }
    else {
      setPopup(true);
    }
  }
  function configureFavorite() {
    if (!favorite) {
      setFavorite(true);
      const eventWithoutCircularRefs = removeCircularReferences(event);
      addToFavorites(eventWithoutCircularRefs);
    } else {
      setFavorite(false);
      removeFromFavorites(event.id); // Pass eventID directly
    }
  }
  function removeCircularReferences(obj) {
    const cache = new Set();
    const newObj = JSON.parse(JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          return;
        }
        cache.add(value);
      }
      return value;
    }));
    cache.clear();
    return newObj;
  }
  function addToFavorites() {
    const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = [...favoritesFromLocalStorage, event];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }
  function removeFromFavorites(eventID) {
    const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favoritesFromLocalStorage.filter((item) => item.id !== eventID);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }
  useEffect(() => {
    const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favoritesFromLocalStorage.some((favoriteItem) => {
      const favoriteIdentifier = `${favoriteItem.title}_${favoriteItem.date.when}_${favoriteItem.address.join('_')}`;
      return favoriteIdentifier === event.id;
    });
    setFavorite(isFavorite);
  }, [event.id]);
  // -- DESIGN -- \\
  return (
      <div className="eventDiv">
        <span className="event">
              <span className="imgDiv">
                <img className="event--img" src={image} />
              </span>
              <div className="infoDiv">
                <div>
                <span>
                <div className="event--title">
                  <span className="event--favorite">
                  {title}
                  <span className="event--star">
                    <button onClick={configureFavorite} className="event--button" title='Favorite'>
                      <img className="event--favorite--img"  src={starSource} />
                    </button>
                </span>
                  </span>
                    <div className="event--date">
                      {start_date}
                      </div>
                      <div className="event--date">
                      {address[0] + " || " + address[1]}
                      </div>
                  </div>
                </span>
                <span>
                <a className="event--icon" target="_blank"  href={(generateGoogleMapsLink(addressLine1 + ", " + addressLine2))}><img title='Directions (Google Maps)' className="event--icon--image" src="https://i.ibb.co/tQjXty2/google-maps-2020-icon.png"></img></a>
                <a className="event--icon" title='Tickets' target="_blank" href={link}><img title='Ticket Link' className="event--icon--image" src="https://i.ibb.co/gSBCmXb/ticket.png"></img></a>
                <button onClick={configurePopup} className="event--button" title='Info'>
                <svg className="event--icon--image" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"/></svg>
                  </button>
                </span>
                </div>
              </div>
        </span>
        {popup && (
        <div className="event--info">
                    <hr></hr>
                    Date: 
          <div className="event--info--description">
            {when}
            </div>
            <hr></hr>
          Description: 
          <div className="event--info--description">
            {description}
            </div>
            <hr></hr>
          </div>
          
          )}
      </div>
  );
};

export default Event;