import React from "react";

import ListMatches from "./ListMatches";
import MainNav from "./MainNav";
import { useCurrentUser } from "../services/useCurrentUser";

function Home(props:any) {
  const [loadUser, logoutUser, { currentUser }] = useCurrentUser();

  return (
    <>
      {currentUser && currentUser.id ? (
        <>
          <MainNav />
          <section className="page__content">
            <h1>Existing matches</h1>
            <ListMatches />
          </section>
        </>
      ) : (
        <section className="page__content">
          <h1>Not authenticated</h1>
        </section>
      )}
    </>
  );
};

export default React.memo(Home);
