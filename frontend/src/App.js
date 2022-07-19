import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { routes, privateRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { refresh_login } from "./features/authSlice";
import MainLayout from "~/layouts/Main";
import Home from "./pages/Home";
import PrivateOutlet from "./components/PrivateOutlet/PrivateOutlet";

function App() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!user.isLoggedIn && token) {
        const action = refresh_login({ token: token });
        await dispatch(action);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          {routes.map((route, index) => {
            let element = <route.page />;
            if (route.layout) {
              element = (
                <route.layout>
                  <route.page />
                </route.layout>
              );
            }
            return <Route key={index} path={route.path} element={element} />;
          })}
          {/* Private route  */}
          <Route element={<PrivateOutlet />}>
            {privateRoutes.map((route, index) => {
              let element = <route.page />;
              if (route.layout) {
                element = (
                  <route.layout>
                    <route.page />
                  </route.layout>
                );
              }
              return <Route key={index} path={route.path} element={element} />;
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
