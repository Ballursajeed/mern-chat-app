import React, { useState } from 'react';
import { socket } from '../socket';

export function MyForm({ user }) {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setValue('');
      socket.emit('chatMessage', { text: value, user: user }, (error) => {
      	 setIsLoading(false);
    if (error) {
      console.error('Error sending message:', error);
      // Handle the error, e.g., display an error message to the user
      alert("Something went wrong:",error)
    }
    });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input value={value} onChange={ e => setValue(e.target.value) } />

      <button type="submit">Submit</button>
    </form>
  );
}