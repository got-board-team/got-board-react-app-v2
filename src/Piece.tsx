import React from 'react';
import { useDrag } from 'react-dnd';

const Piece = React.memo(() => {
  const [{ opacity, left, top, isDragging, initial, end }, dragRef] = useDrag({
    item: { type: "piece", text: "text" },
    collect: monitor => ({
      left: monitor.getDropResult() ? monitor.getDropResult()['x'] : 0,
      top: monitor.getDropResult() ? monitor.getDropResult()['y'] : 0,
      initial: monitor.getInitialClientOffset(),
      end: monitor.getDifferenceFromInitialOffset(),
      opacity: 1,
      isDragging: !!monitor.isDragging(),
    }),
  });

  if (isDragging) {
    console.log({left, top, initial, end})
  }

  return (
    <div className="piece" ref={dragRef} style={{ position: 'absolute', left, top, opacity }}>♘</div>
  );
});

export default Piece;
