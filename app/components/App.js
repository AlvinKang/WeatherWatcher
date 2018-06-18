const React = require("react");
const Home = require("./Home");
const Nav = require("./Nav");
import Forecast from "./Forecast";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/forecast" component={Forecast} />
            <Route render={() => <p>Not found</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

module.exports = App;
