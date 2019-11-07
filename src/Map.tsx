import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Map = React.memo(() => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: "piece", text: "text" },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div className="app">
      <section className="map">
        <div className="piece" ref={dragRef} style={{ opacity }}>♘</div>
      </section>
    </div>
  );
});

export default Map;
