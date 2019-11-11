import React from 'react';
import { useDrag } from 'react-dnd';
import { PieceProps } from './Map';

const Piece = React.memo(({id, x, y}: PieceProps) => {
  const [{ opacity, left, top, isDragging, initial, end }, dragRef] = useDrag({
    item: { id, type: "piece", x, y },
    collect: monitor => ({
      left: monitor.getDropResult() ? monitor.getDropResult()['x'] : x,
      top: monitor.getDropResult() ? monitor.getDropResult()['y'] : y,
      initial: monitor.getInitialClientOffset(),
      end: monitor.getDifferenceFromInitialOffset(),
      opacity: 1,
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div className="piece" ref={dragRef} style={{ position: 'absolute', left, top, opacity }}>♘</div>
  );
});

export default Piece;
