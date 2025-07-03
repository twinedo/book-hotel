import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { citySuggestions } from "../../utils/const";
import useSearchStore from "../../store/search-store";
import "./styles.css";
import { MdPinDrop } from "react-icons/md";

export function SearchLocation() {
  const [locationList, setLocationList] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  const setSelectedLocation = useSearchStore(
    (state) => state.setSelectedLocation
  );

  const onSearchLocation = () => {
    const prevLoc = [...locationList];
    if (location.length > 0) {
      prevLoc.push(location);
      setLocationList(prevLoc);
    }
    setLocationList([])
  };

  const onSelectLocation = (loc: string) => {
    setSelectedLocation(loc);
  };

  return (
    <div>
      <h2>Where to go?</h2>
      <div className="row search-popup-location-wrapper">
        <div className="search-popup-location">
          <BiSearch size={16} />
          <input
            className="search-popup-location-input"
            placeholder="Find city, hotels"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button
          className="search-popup-location-submit"
          onClick={onSearchLocation}
        >
          Search
        </button>
      </div>
      <div className="search-location-list">
        {locationList.length > 0 &&
          locationList.map((item) => (
            <div
              className="search-location-list-item"
              onClick={() => onSelectLocation(item)}
            >
              <MdPinDrop />
              {item}
            </div>
          ))}
      </div>
      <div>
        <h3>Recommendations</h3>
        <div className="city-suggestions-wrapper">
          {citySuggestions.map((item) => (
            <div
              key={item.id}
              className="city-suggestions"
              onClick={() => onSelectLocation(item.city)}
            >
              {item.city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
