import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { combineReducers } from 'redux'

import * as Reducers from './reducers'

import './App.css';
import WarRoom from './WarRoom';
import Map from "./Map";
import Dropable from "./Dropable";
import { updateWarRoom } from "./actions/warRoom";

const reducers = {...Reducers};

console.log(reducers)

console.log(combineReducers(reducers))

const store = createStore(combineReducers(reducers));

const App: React.FC = () => {
  const [warRoomPosition, setWarRoomPosition] = useState({x: 50, y: 50});

  const updateWarRoomPosition = (item: any, monitor: any) => {
    const newCoords = monitor.getDifferenceFromInitialOffset();
    if (newCoords && newCoords.x && newCoords.y) {
      const newX = newCoords.x + warRoomPosition.x;
      const newY = newCoords.y + warRoomPosition.y;
      setWarRoomPosition({x: newX, y: newY});
    }
  }

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <Dropable accept="war-room" dropAction={updateWarRoomPosition}>
            <WarRoom x={warRoomPosition.x} y={warRoomPosition.y} />
            <Map />
          </Dropable>
        </div>
      </DndProvider>
    </Provider>
  );
};

const mapStateToProps = (state: any) => ({
  ...state.warRoom,
});

const mapDispatchToProps = {
  updateWarRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
