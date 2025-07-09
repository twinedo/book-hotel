import { createRoot } from "react-dom/client";
import "./style.css";
import { RouterProvider } from "react-router";
import { router } from "./router";
import React from "react";

// Create a clean root container
const rootElement = document.getElementById("root") || document.body;
rootElement.innerHTML = '<div id="root"></div>'; // Cleaner container

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);