import Router from "./shared/Router";
import { TopButton } from "./components/shared";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <>
      <Router />
      <TopButton />
    </>
  );
}

export default App;
