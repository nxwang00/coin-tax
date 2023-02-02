import AuthRequire from "./services/AuthRequire";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Boarding from "./pages/individual/Boarding";
import Home from "./pages/Home";

export const routes = [
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/",
    guard: AuthRequire,
    layout: Layout,
    component: <Home />,
  },
  {
    path: "/individual/onboarding",
    guard: AuthRequire,
    component: <Boarding />,
  },
];
