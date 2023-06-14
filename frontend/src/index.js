import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import App from "./components/App"

// THIS WAS REACT 17 STUFF
// render usually returns null. However, if the reactNode you pass is a class component, then it will return an instance of that component.
// React will display <App /> in the domNode, and take over managing the DOM inside it.


// THIS IS REACT 18 STUFF

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App />);
// reactDOM.render(<App />, document.getElementById("root"));