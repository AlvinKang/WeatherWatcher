const React = require("react");
import { Redirect } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      fireRedirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Redirect to forecast page
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      fireRedirect: true
    });
  }

  handleChange(event) {
    const searchValue = event.target.value;
    this.setState({
      searchValue: searchValue
    });
  }

  render() {
    const { fireRedirect } = this.state;

    return (
      <div className="home-container">
        <form className="column" onSubmit={this.handleSubmit}>
          <label className="header" htmlFor="search-box">
            Enter a Location.
          </label>
          <input
            id="search-box"
            type="text"
            placeholder="Las Vegas"
            onChange={this.handleChange}
            value={this.state.searchValue}
            autoComplete="off"
          />

          <button
            className="button"
            type="submit"
            disabled={!this.state.searchValue}
          >
            Get Weather
          </button>
        </form>
        {fireRedirect && (
          <Redirect
            to={{
              pathname: "/forecast",
              search: `?location=${this.state.searchValue}`
            }}
          />
        )}
      </div>
    );
  }
}

module.exports = Home;
