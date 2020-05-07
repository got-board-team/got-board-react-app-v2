import React from 'react';
import { Link } from "react-router-dom";

import { useCurrentUser } from "../services/useCurrentUser";

import "./MainNav.scss";

function MainNav() {
  const [loadUser, logoutUser, { currentUser }] = useCurrentUser();

  return (
    <nav className="main-nav">
      <section>
        <Link to="/">Home</Link>
        <Link to="/new-match">New Match</Link>
      </section>
      <section>
        {currentUser && currentUser.id && <span>{currentUser.name} ({currentUser.email}) <button onClick={logoutUser}>Logout</button></span>}
      </section>
    </nav>
  );
}

export default MainNav;
