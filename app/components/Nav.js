const React = require("react");

function Nav(props) {
  return (
    <div className="nav">
      <p className="app-header">
        <i class="fas fa-sun" /> Weather Watcher
      </p>

      <form className="nav-search">
        <input type="text" placeholder="Las Vegas, Nevada" />
        <button className="button">Get Weather</button>
      </form>
    </div>
  );
}

module.exports = Nav;
