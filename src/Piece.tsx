import React from 'react';

import Draggable from './Draggable';

export interface PieceProps {
  id: number;
  type: string;
  x: number;
  y: number;
}

const Piece = React.memo(({id, type, x, y}: PieceProps) => (
  <Draggable id={id} type={type} x={x} y={y}>
    <div className={type}>♘</div>
  </Draggable>
));

export default Piece;
