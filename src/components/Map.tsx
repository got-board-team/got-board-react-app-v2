import React from 'react';
import { connect } from 'react-redux'

import Dropable from "./common/Dropable";
import Piece from './Piece';
import { Drop } from "../reducers/drop";
import { AllPieceKinds } from "../constants";

import "./Map.scss"

interface MapProps {
  drops: Drop[];
}

const Map = React.memo(({drops}: MapProps) => (
  <Dropable accept={AllPieceKinds} dropLocation="map">
    <section className="map">
      {drops.map((drop, index) => <Piece key={index} id={drop.id} x={drop.x} y={drop.y} type={drop.type} location={drop.location} houseName={drop.houseName} spec={drop.spec} />)}
    </section>
  </Dropable>
));

const mapStateToProps = (state: any) => ({
  drops: state.drop.drops.filter((drop: Drop) => drop.location === "map"),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
