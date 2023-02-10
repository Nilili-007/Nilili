import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { courseApi } from "./redux/modules/apiSlice";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApiProvider api={courseApi}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApiProvider>
);
