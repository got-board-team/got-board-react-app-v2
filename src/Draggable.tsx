import React, { useState } from 'react';
import { useDrop } from 'react-dnd'

const Draggable = (Component: React.FC) => (props: any) => {
  console.log('props', props);
  return <Component { ...props } />;
}

export default Draggable;
