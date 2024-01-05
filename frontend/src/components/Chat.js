import React, { useState, useEffect } from 'react';
import { socket } from '../socket.js';
import { Events } from "./Event.js";
import { MyForm } from './MyForm.js';

export default function Chat({ user }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
    	  console.log("Received message:", value);
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chatMessage', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chatMessage', onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <Events events={ fooEvents } />
      <MyForm user={user} />
    </div>
  );
}