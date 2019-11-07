import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './App.css';
import Map from "./Map";

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Map />
    </DndProvider>
  );
}

export default App;
