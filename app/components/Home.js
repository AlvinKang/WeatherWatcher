const React = require("react");

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Send API request and route to other page
  handleSubmit(event) {
    // Prevent default submit
    event.preventDefault();
    // TODO: Call API, route to next page
    console.log(this.state.searchValue);
  }

  //
  handleChange(event) {
    const searchValue = event.target.value;
    this.setState({
      searchValue: searchValue
    });
  }

  render() {
    return (
      <div className="home-container">
        <form className="column" onSubmit={this.handleSubmit}>
          <label className="header" htmlFor="search-box">
            Enter a City and State
          </label>
          <input
            id="search-box"
            type="text"
            placeholder="Las Vegas, Nevada"
            onChange={this.handleChange}
            value={this.state.searchValue}
          />
          <button className="button" type="submit">
            Get Weather
          </button>
        </form>
      </div>
    );
  }
}

module.exports = Home;
