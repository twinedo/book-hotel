import { BiSearch } from "react-icons/bi";
import { Header } from "../../components/header";
import { Hero } from "../../components/hero";
import { SearchBox } from "../../components/search-box";
import "./styles.css";
import React, { useState } from "react";
import { citySuggestions } from "../../utils/const";
import { DateRange, DateRangePicker } from "../../components/date-range-picker";
import { RoomGuestCount } from "../../components/room-guest-count";

export function RenderHome() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
  });
  return (
    <div className="home-page">
      <div className="hero-background-wrapper">
        <div className="hero-gradient-overlay" />
        <Header />
        <Hero />
        <SearchBox />
      </div>
      <div className="home-page-content-wrapper">
        <div className="search-popup-wrapper">
          <div className="search-popup-container">
            <div>
              {/* <h2>Where to go?</h2>
            <div className="row search-popup-location-wrapper">
              <div className="search-popup-location">
                <BiSearch size={16} />
                <input
                  className="search-popup-location-input"
                  placeholder="Find city, hotels"
                />
              </div>
              <button className="search-popup-location-submit">Search</button>
            </div>
            <div>
              <h3>Recommendations</h3>
              <div className="city-suggestions-wrapper">
                {citySuggestions.map((item) => (
                  <div key={item.id} className="city-suggestions">
                    {item.city}
                  </div>
                ))}
              </div>
            </div> */}
            </div>

            {/* <div>
              <DateRangePicker onChange={(range) => setDateRange(range)} />

              {dateRange.start && dateRange.end && (
                <p>
                  Selected range: {dateRange.start?.toLocaleString()} to{" "}
                  {dateRange.end.toLocaleString()}
                </p>
              )}
            </div> */}
            <RoomGuestCount />
          </div>
        </div>

        <h1>THIS IS CONTENT AT HOME</h1>
      </div>
    </div>
  );
}
