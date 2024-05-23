import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

import Layout from "@/layout";

import App from "@/pages/app";

const Lotto = lazy(() => import("@/pages/lotto"));
const Ranking = lazy(() => import("@/pages/ranking"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/lobby", element: <Lotto /> },
      { path: "/ranking", element: <Ranking /> },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
