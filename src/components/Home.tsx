import React from "react";

import ListMatches from "./ListMatches";
import MainNav from "./MainNav";

function Home() {
  return (
    <section>
      <MainNav />
      <h1>Existing matches</h1>
      <ListMatches />
    </section>
  );
};

export default React.memo(Home);
