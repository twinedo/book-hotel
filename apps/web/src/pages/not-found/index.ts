// src/pages/home/index.ts
// import "../../styles/base.css";
import "./styles.css";

export function renderNotFound() {
  const main = document.getElementById('main-content')!;
  main.innerHTML = `
    <div>
      <h1>PAGE NOT FOUND</h1>
    </div>
  `;
}