import React, { useEffect, Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux'
import Pusher from 'pusher-js';
import { BrowserRouter } from "react-router-dom";

import Router from "./components/Router";
import store from "./store";
import './App.scss';

const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY || "";
const PUSHER_CLUSTER = process.env.REACT_APP_PUSHER_CLUSTER || "";

const App: React.FC = () => {
  useEffect(() => {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      encrypted: true
    });
    const channel = pusher.subscribe('game');
    channel.bind('update', action => {
      // Mock currenUser for now
      const currentUser = "baratheon";
      //const currentUser = store.getState()["currentUser"]["houseName"];

      // Only dispatch if author is different
      if (currentUser !== action.dispatchAuthor) {
        console.log("Dispatching", action);
        store.dispatch(action);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <DndProvider backend={HTML5Backend}>
            <div className="app">
              <Router />
            </div>
          </DndProvider>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
