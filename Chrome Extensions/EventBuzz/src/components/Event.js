import React from 'react';

const Event = (event) => {
  // -- VARIABLES -- \\ 
  const { title, date, address, link, image } = event;
  const { start_date, when } = date;
  const [addressLine1, addressLine2] = address;

  // -- FUNCTIONS -- \\ 
  function generateGoogleMapsLink(address) {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsLink = `https://www.google.com/maps?q=${encodedAddress}`;
    return googleMapsLink;
  }
  
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
                  {title}
                    <div className="event--date">
                      {start_date}
                      </div>
                      <div className="event--date">
                      {address}
                      </div>
                  </div>
                </span>
                <span>
                <a className="event--icon" target="_blank"  href={(generateGoogleMapsLink(addressLine1 + ", " + addressLine2))}><img title='Directions (Google Maps)' className="event--icon--image" src="https://i.ibb.co/tQjXty2/google-maps-2020-icon.png"></img></a>
                <a className="event--icon" title='Tickets' href={link}><img title='Ticket Link' className="event--icon--image" src="https://i.ibb.co/gSBCmXb/ticket.png"></img></a>
                <a className="event--icon" title={when}><img className="event--icon--image" src="https://i.ibb.co/BcFK9Br/calendar.png"/></a>
                </span>
                </div>
              </div>
        </span>
      </div>
  );
};

export default Event;