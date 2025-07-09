import { RenderHome } from "../pages/home";
import { createBrowserRouter } from "react-router";
import React from "react";
import { RenderCheckout } from "../pages/checkout";
import { RenderDashboard } from "../pages/dashboard";
import { RenderAuth } from "../pages/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RenderHome />,
  },
  {
    path: "/auth",
    element: <RenderAuth />,
  },
  {
    path: "/checkout",
    element: <RenderCheckout />,
  },
  {
    path: "/dashboard",
    element: <RenderDashboard />,
  },
]);
