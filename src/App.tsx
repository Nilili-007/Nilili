import Router from "./shared/Router";
import { TopButton } from "./components/shared";
import { useEffect } from "react";
import { initAmplitude } from "./utils/amplitude";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  useEffect(() => {
    initAmplitude();
  }, []);
  return (
    <>
      <Router />
      <TopButton />
    </>
  );
}

export default App;
