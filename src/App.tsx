import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux'

import Game from "./Game";
import Store from "./store";
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <Game />
        </div>
      </DndProvider>
    </Provider>
  );
};

export default App;
