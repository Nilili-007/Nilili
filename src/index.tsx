import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { courseApi } from "./redux/modules/apiSlice";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { HelmetProvider } from "react-helmet-async";

Sentry.init({
  dsn: "https://f297ca4337b14c53a080fd3dcde23d90@o4504768449019904.ingest.sentry.io/4504768455114752",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApiProvider api={courseApi}>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </ApiProvider>
);
