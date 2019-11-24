import React from 'react';

import Draggable from './common/Draggable';
import { Drop } from "../reducers/drop";

import "./Piece.scss";

const Piece = React.memo(({id, type, x, y, location, houseName}: Drop) => {
  const pieceClassName = `${type} ${type}--${houseName}`;

  return (
    <Draggable id={id} type={type} x={x} y={y} location={location} houseName={houseName} className={pieceClassName} />
  );
});

export default Piece;
