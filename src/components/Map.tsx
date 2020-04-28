import React from 'react';

import Dropable from "./common/Dropable";
import Piece from './Piece';
import { Drop } from "../models";
import { AllPieceKinds } from "../constants";

import "./Map.scss"

interface Props {
  drops: Drop[];
}

function Map ({drops}: Props) {
  return (
    <Dropable accept={AllPieceKinds} dropLocation="map">
      <section className="map">
        {drops.map((drop, index) => <Piece key={index} id={drop.id} x={drop.x} y={drop.y} piece_type={drop.piece_type} location={drop.location} houseName={drop.houseName} spec={drop.spec} />)}
      </section>
    </Dropable>
  );
}

export default React.memo(Map);
