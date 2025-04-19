import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { Home } from "../pages/home";
import { Game } from "../pages/game";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/game", element: <Game /> },
    ],
  },
]);
