const React = require("react");
const ReactDOM = require("react-dom");
require("./index.css");
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

ReactDOM.render(<App />, document.getElementById("app"));
