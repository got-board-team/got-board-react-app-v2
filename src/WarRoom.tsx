import React, { useState } from 'react';

import Draggable from './Draggable';

const WarRoom = React.memo(({children}) => {
  return (
    <section className="war-room">{children}</section>
  );
});

export default Draggable(WarRoom);
