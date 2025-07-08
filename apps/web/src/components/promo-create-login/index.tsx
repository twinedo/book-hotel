import React, { useEffect, useState } from "react";
import "./styles.css";
import useAuthStore from "../../store/auth-store";

export function PromoCreateLogin() {
  const [, setCurrentTab] = useState(useAuthStore.getState().currentTab);

  const onNavigateToAuth = (value: "register" | "login") => {
    useAuthStore.getState().setCurrentTab(value);
  };

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state) =>
      setCurrentTab(state.currentTab)
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="promo-wrapper">
      <a
        className="promo-link"
        href="/auth"
        // target="_blank"
        onClick={() => onNavigateToAuth("register")}
      >
        Create account
      </a>
      <span className="promo-divider">or</span>
      <a
        className="promo-link"
        href="/auth"
        // target="_blank"
        onClick={() => onNavigateToAuth("login")}
      >
        Login
      </a>
      <span className="promo-divider"> to get more discount</span>
    </div>
  );
}
