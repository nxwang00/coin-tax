import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { login } from "./redux/authSlice";
import { routes } from "./routes";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  if (!isAuthenticated) {
    // when redux store is initialized but data in localstorage is still alive, then get data from
    // localstorage and restructure the redux store auth data.
    let isAuthStorage = sessionStorage.getItem("isAuthenticated");
    if (isAuthStorage === "done") {
      let userStorage = sessionStorage.getItem("user");
      dispatch(
        login({
          isAuthenticated: true,
          user: JSON.parse(userStorage),
        })
      );
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, idx) => {
          const AuthRequire = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={idx}
              path={route.path}
              element={
                <AuthRequire>
                  <Layout>{Component}</Layout>
                </AuthRequire>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
