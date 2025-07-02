// src/router/index.ts
import Navigo from "navigo";
import { renderHome } from "../pages/home";
import { renderAuth } from "../pages/auth";
import { renderSearch } from "../pages/search";
import { renderNotFound } from "../pages/not-found";

const router = new Navigo("/");

export function setupRoutes() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <main id="main-content"></main>
  `;

  router
    .on("/", () => renderHome())
    .on("/auth", () => renderAuth())
    .on("/search", () => renderSearch())
    // .on('/dashboard', () => renderDashboard())
    .notFound(() => renderNotFound())
    .resolve();
}

export function navigate(path: string) {
  router.navigate(path);
}
