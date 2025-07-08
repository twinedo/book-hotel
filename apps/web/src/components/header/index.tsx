import { headerAuth, headerMenu } from "./const";
import React from "react";
import "./styles.css";
import useAuthStore from "../../store/auth-store";
import useUserStore from "../../store/user-store";

export function Header() {

  const isLoggedIn = useUserStore(state => state.isLoggedIn)

  const onNavigateToAuth = (value: "Sign In" | "Sign Up") => {
    const tab = value === "Sign In" ? "login" : "register";
    useAuthStore.getState().setCurrentTab(tab);
  };

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
          {!isLoggedIn && headerAuth.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={item.className}
              onClick={() =>
                onNavigateToAuth(item.title as "Sign In" | "Sign Up")
              }
            >
              {item.title}
            </a>
          ))}
          {isLoggedIn && <a href="/dashboard"><strong>Dashboard</strong></a>}
        </div>
      </div>
    </header>
  );
}
