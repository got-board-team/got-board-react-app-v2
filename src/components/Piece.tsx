import React from 'react';

import Draggable from './common/Draggable';
import { Drop } from "../reducers/drop";

const Piece = React.memo(({id, type, x, y, location}: Drop) => (
  <Draggable id={id} type={type} x={x} y={y} location={location}>
    <div className={type}>♘</div>
  </Draggable>
));

export default Piece;
