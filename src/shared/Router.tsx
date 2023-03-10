import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {
  Main,
  NotFound,
  Login,
  Register,
  AuthForgot,
  Post,
  User,
  Course,
  EditCourse,
  Search,
} from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/post" element={<Post />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/edit/:id" element={<EditCourse />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authforgot" element={<AuthForgot />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
