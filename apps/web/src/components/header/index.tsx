import { headerAuth, headerMenu } from "./const";
import React from "react";
import './styles.css'

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">Convertium</div>
        <nav className="header-nav">
          {headerMenu.map((item) => (
            <a key={item.title} href={item.href} className={item.className}>
              {item.title}
            </a>
          ))}
        </nav>
        <div className="header-auth">
          {headerAuth.map((item) => (
            <a key={item.title} href={item.href} className={item.className}>
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
