import React from "react";
import "./styles.css";
import { PopupSearch } from "../popup-search";
import { PopupDate } from "../popup-date";
import { PopupRoomGuest } from "../popup-room-guest";
import useSearchStore from "../../store/search-store";

export function SearchBox() {
  const {selectedLocation, selectedDate} = useSearchStore()

  console.log('selectedDate', selectedDate)

  return (
    <div className="search-wrapper">
      <div className="promo-wrapper">
        Create account or Login to get more discount
      </div>
      <div className="search-container">
        <div className="search-container-row">
          <PopupSearch />
          <PopupDate />
          <PopupRoomGuest />
        </div>
        {selectedLocation.length > 0 && <div className="button-search">
          Search for Rooms
        </div>}
      </div>
    </div>
  );
}
