import React from 'react';

import { CurrentMatchState } from "../reducers/currentMatch";
import { CurrentUserState } from "../reducers/currentUser";

interface Props {
  currentMatch: CurrentMatchState;
  currentUser: CurrentUserState;
}

function JoinMatch({currentMatch, currentUser}: Props) {
  if (!(currentMatch && currentMatch.attributes)) {
    return (
      <p>Loading</p>
    );
  }

  // TODO: Get all this information and build the screen
  // Create the hook to post to join endpoint
  console.log(currentMatch);
  console.log(currentUser.attributes);

  return (
    <section className="ui__panel ui__panel--centralized">
      <h3>Select one of the available houses</h3>
    </section>
  );
}

export default JoinMatch;
