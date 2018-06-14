const React = require("react");
const Home = require("./components/Home");
const Nav = require("./components/Nav");

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
