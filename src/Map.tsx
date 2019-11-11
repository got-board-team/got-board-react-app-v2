import React from 'react';
import { useDrop } from 'react-dnd'

import Piece from './Piece';

export interface DragItem {
  type: string
  id: string
  top: number
  left: number
}

const Map = React.memo(() => {
  const [collectedProps, drop] = useDrop({
    accept: "piece",
    canDrop: () => true,
    drop: (item: DragItem, monitor) => console.log('drop!', monitor.getDifferenceFromInitialOffset()),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <section className="map" ref={drop}>
      <Piece />
      <Piece />
      <Piece />
    </section>
  );
});

export default Map;
