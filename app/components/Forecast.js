const React = require("react");
const api = require("../utils/api");
import queryString from "query-string";

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {
        address: "",
        city: "",
        state: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Retrieve the search query from link
    const search = this.props.location.search;
    const query = queryString.parse(search);
    console.log(query);
    // Call api
  }

  handleSubmit(event) {
    // Prevent default submit
    event.preventDefault();
    // TODO: Call API, route to next page
    const results = {};
    api.getForecast(this.state.searchValue).then(data => {
      console.log(data);
    });
  }

  // AJAX fetch on mount to get 5 day forecast (push 5 objects into array)
  // For each forecast object, create forecast detail card
  // Update the state with 5 Forecast detail cards

  render() {
    return <div>Forecast page</div>;
  }
}

module.exports = Forecast;
