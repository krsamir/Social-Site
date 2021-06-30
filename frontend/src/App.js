import React from "react";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./Redux/store";
function App() {
  return (
    <div>
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
