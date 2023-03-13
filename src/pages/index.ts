import { lazy } from "react";

import Main from "./Main";
import NotFound from "./NotFound";
import Login from "./Login";
import Register from "./Register";
import AuthForgot from "./AuthForgot";

const Post = lazy(() => import("./Post"));
const User = lazy(() => import("./User"));
const Course = lazy(() => import("./Course"));
const Search = lazy(() => import("./Search"));
const EditCourse = lazy(() => import("./EditCourse"));

export {
  Course,
  Main,
  User,
  Post,
  Search,
  NotFound,
  EditCourse,
  Login,
  Register,
  AuthForgot,
};
