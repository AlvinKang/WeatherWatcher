const React = require("react");
import { Link, Redirect } from "react-router-dom";

const NavHeader = () => {
  return (
    <Link to="/" className="link">
      <p className="app-header">
        <i className="fas fa-sun" />
        <span id="app-name"> Weather Watcher</span>
      </p>
    </Link>
  );
};

const Nav = () => {
  return (
    <div className="nav">
      <NavHeader />
    </div>
  );
};

module.exports = Nav;
