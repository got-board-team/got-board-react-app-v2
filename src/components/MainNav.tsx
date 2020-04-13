import React from 'react';
import { Link } from "react-router-dom";

import "./MainNav.scss";

function MainNav() {
  return (
    <nav className="main-nav">
      <Link to="/">Home</Link>
      <Link to="/new-match">New Match</Link>
    </nav>
  );
}

export default MainNav;
