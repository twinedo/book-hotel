import React from "react";
import "./styles.css";
import { PopupSearch } from "../popup-search";
import { PopupDate } from "../popup-date";
import { PopupRoomGuest } from "../popup-room-guest";
import useSearchStore from "../../store/search-store";
import { PromoCreateLogin } from "../promo-create-login";
import useUserStore from "../../store/user-store";

export function SearchBox() {
  const { selectedLocation, setIsResult } = useSearchStore();
  const isLoggedIn = useUserStore(state => state.isLoggedIn)

  const onSearchHotels = () => {
    setIsResult(true);
  };

  return (
    <div className="search-wrapper">
      {!isLoggedIn && <PromoCreateLogin />}
      <div className="search-container">
        <div className="search-container-row">
          <PopupSearch />
          <PopupDate />
          <PopupRoomGuest />
        </div>
        {selectedLocation.length > 0 && (
          <div className="button-search" onClick={onSearchHotels}>
            Search for Hotels
          </div>
        )}
      </div>
    </div>
  );
}
