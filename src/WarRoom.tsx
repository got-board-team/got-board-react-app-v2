import React, { useState } from 'react';

const WarRoom = React.memo(({children}) => {
  return (
    <section className="war-room">{children}</section>
  );
});

export default WarRoom;
