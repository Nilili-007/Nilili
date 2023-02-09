import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main, Post, User, Course } from "../pages";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/:id" element={<Course />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
