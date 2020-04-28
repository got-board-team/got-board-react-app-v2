import React, { ReactNode } from 'react';
import { useDrag } from 'react-dnd'

import { Drop } from "../../models";

interface Props extends Drop {
  children?: ReactNode;
  className: string;
}

const Draggable = ({id, x, y, piece_type, children, location, className, houseName, spec}: Props) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { id, piece_type, x, y, location, houseName, spec },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.1 : 1,
      isDragging: !!monitor.isDragging(),
    }),
  });
  const finalClassName = `draggable ${className}`

  return <div className={finalClassName} ref={dragRef} style={{ left: x, top: y, opacity }}>{children}</div>;
}

export default Draggable;
