import Router from "./shared/Router";
import { TopButton } from "./components/shared";
import { useEffect } from "react";
import { initAmplitude } from "./utils/amplitude";
import MetaTag from "./utils/MetaTag";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  useEffect(() => {
    initAmplitude();
  }, []);
  return (
    <>
      <MetaTag />
      <Router />
      <TopButton />
    </>
  );
}

export default App;
