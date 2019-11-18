import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux'

import Game from "./Game";
import store from "./store";
import './App.css';

const App: React.FC = () => (
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Game />
      </div>
    </DndProvider>
  </Provider>
);

export default App;
