import React from 'react';

export function Events({ events }) {
  return (
    <ul>
    {
      events.map((event, index) =>
        <li key={ index }>
        {event.user}: {event.text}
        </li>
      )
    }
    </ul>
  );
}