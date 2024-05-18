import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

import Layout from "@/layout";

import App from "@/App";

const Lobby = lazy(() => import("@/pages/lobby"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/lobby", element: <Lobby /> },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
