const React = require("react");
const Home = require("./Home");
const Nav = require("./Nav");

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Nav />
        <Home />
      </div>
    );
  }
}

module.exports = App;
