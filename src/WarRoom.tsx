import React, { ReactNode } from 'react';

import Draggable from './Draggable';

interface WarRoomProps {
  id: number;
  type: string;
  x: number;
  y: number;
  children: ReactNode;
}

const WarRoom = React.memo(({id, type, x, y, children}: WarRoomProps) => (
  <Draggable id={id} type={type} x={x} y={y}>
    <section className="war-room">{children}</section>
  </Draggable>
));

export default WarRoom;
