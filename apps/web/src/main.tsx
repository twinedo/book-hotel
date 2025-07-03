import { createRoot } from "react-dom/client";
import "./style.css";
import { RouterProvider } from "react-router";
import { router } from "./router";
import React from "react";

document.body.innerHTML = '<main id="main-content"></main>';

const root = createRoot(document.getElementById("main-content")!);

root.render(<RouterProvider router={router} />);
