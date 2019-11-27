import React, { ReactNode } from 'react';
import { useDrag } from 'react-dnd'

import { Drop } from "../../reducers/drop";

interface Props extends Drop {
  children?: ReactNode;
  className: string;
}

const Draggable = ({id, x, y, type, children, location, className, houseName, spec}: Props) => {
  const [{ opacity, left, top }, dragRef] = useDrag({
    item: { id, type, x, y, location, houseName, spec },
    collect: monitor => ({
      left: monitor.getDropResult() ? monitor.getDropResult()['x'] : x,
      top: monitor.getDropResult() ? monitor.getDropResult()['y'] : y,
      opacity: monitor.isDragging() ? 0.1 : 1,
      isDragging: !!monitor.isDragging(),
    }),
  });

  const finalClassName = `draggable ${className}`
  return <div className={finalClassName} ref={dragRef} style={{ left, top, opacity }}>{children}</div>;
}

export default Draggable;
