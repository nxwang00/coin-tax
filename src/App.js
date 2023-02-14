import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { login } from "./redux/authSlice";
import { routes } from "./routes";
import { Toaster } from "react-hot-toast";

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
      <Toaster
        toastOptions={{
          success: {
            iconTheme: {
              primary: "white",
              secondary: "#10B981",
            },
            style: {
              background: "#10B981", // tailwind bg-green-500
              color: "#FFFFFF",
              fontSize: "15px",
            },
          },
          error: {
            iconTheme: {
              primary: "white",
              secondary: "#EF4444",
            },
            style: {
              background: "#EF4444", // tailwind bg-red-500
              color: "#FFFFFF",
              fontSize: "15px",
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
