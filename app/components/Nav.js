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

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      fireRedirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      fireRedirect: true
    });
  }

  handleChange(event) {
    const searchValue = event.target.value;
    this.setState({
      searchValue: searchValue,
      fireRedirect: false
    });
  }

  render() {
    const { fireRedirect } = this.state;

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
        {fireRedirect && (
          <Redirect
            push
            to={{
              pathname: "/forecast",
              search: `?location=${this.state.searchValue}`
            }}
            from="/"
          />
        )}
      </div>
    );
  }
}

module.exports = Nav;
