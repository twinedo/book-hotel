// src/pages/home/index.ts
// import "../../styles/base.css";
import "./styles.css";
import { setupCounter } from "@repo/ui/setup-counter";

export function renderHome() {
  const main = document.getElementById('main-content')!;
  main.innerHTML = `
    <div class="home-page">
      <h1>Welcome to Our App</h1>
      <div class="features">
        <div class="feature-card">
          <h3>Feature 1</h3>
          <p>Description of feature 1</p>
        </div>
        <div class="feature-card">
          <h3>Feature 2</h3>
          <p>Description of feature 2</p>
        </div>
      </div>
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
    </div>
  `;

  // Setup any interactive elements
  setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
}