import React from 'react';
import { useDrag } from 'react-dnd';
import { PieceProps } from './Map';

const Piece = React.memo(({id, x, y}: PieceProps) => {
  const [{ opacity, left, top }, dragRef] = useDrag({
    item: { id, type: "piece", x, y },
    collect: monitor => ({
      left: monitor.getDropResult() ? monitor.getDropResult()['x'] : x,
      top: monitor.getDropResult() ? monitor.getDropResult()['y'] : y,
      opacity: monitor.isDragging() ? 0.1 : 1,
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div className="piece" ref={dragRef} style={{ left, top, opacity }}>♘</div>
  );
});

export default Piece;
