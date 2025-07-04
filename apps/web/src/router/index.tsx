import { RenderHome } from "../pages/home";
import { createBrowserRouter } from "react-router";
import { VanillaAuthWrapper } from "../components/auth-wrapper";
import React from "react";
import { RenderCheckout } from "../pages/checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RenderHome />,
  },
  {
    path: "/auth",
    element: <VanillaAuthWrapper />,
  },
  {
    path: "/checkout",
    element: <RenderCheckout />,
  },
]);
