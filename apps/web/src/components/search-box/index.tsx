import React from "react";
import "./styles.css";
import { PopupSearch } from "../popup-search";
import { PopupDate } from "../popup-date";
import { PopupRoomGuest } from "../popup-room-guest";

export function SearchBox() {
  return (
    <div className="search-wrapper">
      <div className="promo-wrapper">
        Create account or Login to get more discount
      </div>
      <div className="search-container">
        <PopupSearch />
        <PopupDate />
        <PopupRoomGuest />
      </div>
      
    </div>
  );
}
