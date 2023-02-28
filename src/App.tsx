import Router from "./shared/Router";
import { TopButton } from "./components/shared";
import { useEffect } from "react";
import { initAmplitude } from "./utils/amplitude";

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
