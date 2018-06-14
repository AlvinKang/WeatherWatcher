const React = require("react");

function Nav(props) {
  return (
    <div className="nav">
      <p className="app-header">
        <i className="fas fa-sun" />
        <span id="app-name"> Weather Watcher</span>
      </p>

      <form className="nav-search">
        <input type="text" placeholder="Las Vegas, Nevada" />
        <button className="button">Get Weather</button>
      </form>
    </div>
  );
}

module.exports = Nav;
