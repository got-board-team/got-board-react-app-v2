import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd'

interface Props {
  accept: string;
  dropAction: (item: any, monitor: any) => void;
  children: ReactNode;
}

const Dropable = ({accept, dropAction, children}: Props) => {
  const [collectedProps, drop] = useDrop({
    accept,
    canDrop: () => true,
    drop: dropAction,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return <div className="dropable" ref={drop}>{children}</div>;
}

export default Dropable;
