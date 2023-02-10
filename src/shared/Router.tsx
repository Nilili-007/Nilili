import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main, Post, User, Course, Search } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post" element={<Post />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/:id" element={<Course />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
