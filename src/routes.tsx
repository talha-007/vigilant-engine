import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./components/layout";
import List from "./pages/list";
import HomePage from "./pages/homePgae";
import Page404 from "./pages/Page404";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { element: <HomePage />, index: true },
        { path: "list", element: <List /> },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);

  return routes;
}
