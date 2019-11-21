import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux'
import Pusher from 'pusher-js';

import Game from "./Game";
import store from "./store";
import './App.css';

const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY || "";
const PUSHER_CLUSTER = process.env.REACT_APP_PUSHER_CLUSTER || "";

const App: React.FC = () => {
  useEffect(() => {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      encrypted: true
    });
    const channel = pusher.subscribe('game');
    channel.bind('update', data => {
      console.log('From pusher update:', data);
    });
  }, []);

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <Game />
        </div>
      </DndProvider>
    </Provider>
  );
};

export default App;
