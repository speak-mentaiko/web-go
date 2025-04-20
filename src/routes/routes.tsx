import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { Home } from "../pages/home";
import { Game } from "../pages/game";
import { Result } from "../pages/result";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/game", element: <Game /> },
      { path: "/result", element: <Result /> },
    ],
  },
]);
