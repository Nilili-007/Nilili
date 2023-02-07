import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main, Post, User, Course } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/:id" element={<Course />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
