import React, { useCallback } from 'react';

import Draggable from './common/Draggable';
import { Drop } from "../models";
import { PieceKinds } from "../constants";

import "./Piece.scss";

function Piece({id, type, x, y, location, houseName, spec}: Drop) {
  const cardClassName = useCallback(() => {
    if (!spec) return '';
    return spec.flipped ? `${type} ${type}__back--${houseName}` : `${type} ${type}__${spec.card}`;
  }, [type, houseName, spec]);
  const loadPieceClassName = useCallback(() => {
    return type === PieceKinds.CARD ? cardClassName() : `${type} ${type}--${houseName}`; // TODO: houseName can be null!
  }, [type, houseName, cardClassName]);
  const pieceClassName = loadPieceClassName();

  return (
    <Draggable id={id} type={type} x={x} y={y} location={location} houseName={houseName} className={pieceClassName} spec={spec} />
  );
};

export default React.memo(Piece);
