import AuthRequire from "./services/AuthRequire";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Boarding from "./pages/individual/Boarding";
import Home from "./pages/home";
import Review from "./pages/review";
import Reports from "./pages/reports";
import Unlock from "./pages/unlock";

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
    path: "/review",
    guard: AuthRequire,
    layout: Layout,
    component: <Review />,
  },
  {
    path: "/reports",
    guard: AuthRequire,
    layout: Layout,
    component: <Reports />,
  },
  {
    path: "/unlock",
    guard: AuthRequire,
    component: <Unlock />,
  },
  {
    path: "/individual/onboarding",
    guard: AuthRequire,
    component: <Boarding />,
  },
];
