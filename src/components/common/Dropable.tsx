import React, { ReactNode, useCallback } from 'react';
import { useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'

import { useUpdateDrop } from "../../actions/drop";
import { Drop } from "../../models";
import { selectCurrentMatch } from "../../selectors";
import { CurrentMatchState } from "../../reducers/currentMatch";

interface Props {
  accept: string | Array<string>;
  dropLocation: string;
  dropAction?: (drop: Drop, monitor: any) => void;
  children: ReactNode;
}

function Dropable({accept, dropAction, children, dropLocation}: Props) {
  const currentMatch: CurrentMatchState = useSelector(selectCurrentMatch);
  const [updateDrop, { loading, error }] = useUpdateDrop();

  function defaultDropAction(drop: Drop, monitor: any) {
    const coords = monitor.getDifferenceFromInitialOffset();
    const otherCoords = monitor.getSourceClientOffset();
    const hasChangedLocation = drop.location !== dropLocation;
    const computedX = hasChangedLocation ? otherCoords.x : drop.x + coords.x;
    const computedY = hasChangedLocation ? otherCoords.y : drop.y + coords.y;

    const updatedDrop = {
      ...drop,
      x: computedX,
      y: computedY,
      location: dropLocation,
      piece_type: drop.type,
      house_name: drop.houseName,
    };

    if (currentMatch && currentMatch.id) {
      updateDrop(currentMatch.id, drop.id, updatedDrop);
    }
  };

  const [collectedProps, drop] = useDrop({
    accept,
    canDrop: () => true,
    //@ts-ignore
    drop: dropAction || defaultDropAction,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return <div className="dropable" ref={drop}>{children}</div>;
};

export default React.memo(Dropable);
