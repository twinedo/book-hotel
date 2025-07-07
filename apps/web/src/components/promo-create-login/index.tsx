import React from "react";
import './styles.css'

export function PromoCreateLogin() {
  return (
    <div className="promo-wrapper">
      <a className="promo-link" href="/auth" target="_blank">
        Create account
      </a>
      <span className="promo-divider">or</span>
      <a className="promo-link" href="/auth" target="_blank">
        Login
      </a>
      <span className="promo-divider"> to get more discount</span>
    </div>
  );
}
