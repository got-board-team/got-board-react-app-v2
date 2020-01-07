import React from "react";
import { Link } from "react-router-dom";

const Home = React.memo(() => (
  <section>
    <nav>
      <Link to="/new-game">New Game</Link><br />
      <Link to="/games/1">Game 1</Link>
    </nav>
  </section>
));

export default Home;
