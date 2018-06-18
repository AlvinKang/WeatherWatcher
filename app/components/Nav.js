const React = require("react");
const api = require("../utils/api");
import { Link } from "react-router-dom";

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

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const searchValue = event.target.value;
    this.setState({
      searchValue: searchValue
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // TODO: Call API, route to next page
    const results = {};
    api.getCurrentWeather(this.state.searchValue).then(data => {
      results.weather = data.weather;
      results.location = data.name;
      console.log(results);
    });
  }

  render() {
    return (
      <div className="nav">
        <NavHeader />
        <form className="nav-search" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Las Vegas, Nevada"
            onChange={this.handleChange}
            value={this.state.searchValue}
          />
          <button
            className="button"
            type="submit"
            disabled={!this.state.searchValue}
          >
            Get Weather
          </button>
        </form>
      </div>
    );
  }
}

module.exports = Nav;
