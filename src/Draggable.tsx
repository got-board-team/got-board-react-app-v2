import React, { ReactNode } from 'react';
import { useDrag } from 'react-dnd'

import { PieceProps } from "./Piece";

interface Props extends PieceProps {
  children: ReactNode;
}

const Draggable = ({id, x, y, type, children}: Props) => {
  const [{ opacity, left, top }, dragRef] = useDrag({
    item: { id, type: type, x, y },
    collect: monitor => ({
      left: monitor.getDropResult() ? monitor.getDropResult()['x'] : x,
      top: monitor.getDropResult() ? monitor.getDropResult()['y'] : y,
      opacity: monitor.isDragging() ? 0.1 : 1,
      isDragging: !!monitor.isDragging(),
    }),
  });

  // accept and setter method
  return <div className="draggable" ref={dragRef} style={{ left, top, opacity }}>{children}</div>;
}

export default Draggable;
