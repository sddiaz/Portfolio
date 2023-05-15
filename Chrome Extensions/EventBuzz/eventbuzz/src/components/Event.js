import React from 'react';

const Event = ({ event }) => {
  const {
    title,
    date,
    address,
    link,
    event_location_map,
    image,
    thumbnail,
    ticket_info,
    venue,
  } = event;

  return (
    <div className="event-card">
      <div className="event-image">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="event-details">
        <h2>{title}</h2>
        <p>Date: {date.start_date}</p>
        <p>Address: {address.join(', ')}</p>
        <p>Venue: {venue.name}</p>
        <p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            More Info
          </a>
        </p>
      </div>
    </div>
  );
};

export default Event;