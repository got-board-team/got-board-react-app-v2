import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'

import { updateDrop } from "./actions/drop";
import { Drop } from "./reducers/drop";

interface Props {
  accept: string;
  dropLocation: string;
  dropAction?: (item: any, monitor: any) => void;
  children: ReactNode;
  updateDrop: (drop: Drop) => void;
}

const Dropable = ({accept, dropAction, children, updateDrop, dropLocation}: Props) => {
  const defaultDropAction = (drop: Drop, monitor: any) => {
    //const coords = monitor.getDifferenceFromInitialOffset();
    const coords = monitor.getSourceClientOffset();
    if (coords && coords.x && coords.y) {
      const updatedDrop = {
        ...drop,
        x: coords.x,
        y: coords.y,
        location: dropLocation,
      };
      updateDrop(updatedDrop);
    }
  };

  const [collectedProps, drop] = useDrop({
    accept,
    canDrop: () => true,
    drop: dropAction || defaultDropAction,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return <div className="dropable" ref={drop}>{children}</div>;
}

const mapStateToProps = (state: any) => ({
  drops: state.drop.drops.filter((drop: Drop) => drop.location === "map"),
});

const mapDispatchToProps = {
  updateDrop,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropable);
