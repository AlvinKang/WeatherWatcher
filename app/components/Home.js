const React = require("react");

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <form className="column">
          <label className="header" htmlFor="search-box">
            Enter a City and State
          </label>
          <input id="search-box" type="text" placeholder="Las Vegas, Nevada" />
          <button className="button" type="submit">
            Get Weather
          </button>
        </form>
      </div>
    );
  }
}

module.exports = Home;
