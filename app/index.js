const React = require("react");
const ReactDOM = require("react-dom");
require("./assets/fonts.css");
require("./assets/svg.css");
require("./assets/loading.css");
require("./index.css");

const App = require("./components/App");

ReactDOM.render(<App />, document.getElementById("app"));
