import Router from "./shared/Router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { TopButton } from "./components";

function App() {
  return (
    <>
      <Header />
      <Router />
      <TopButton />
      <Footer />
    </>
  );
}

export default App;
