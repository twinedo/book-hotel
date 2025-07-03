import { Header } from "../../components/header";
import { Hero } from "../../components/hero";
import { SearchBox } from "../../components/search-box";
import "./styles.css";
import React from "react";
import { DateRangePicker } from "../../components/date-range-picker";
import { RoomGuestCount } from "../../components/room-guest-count";
import useSearchStore from "../../store/search-store";
import { SearchLocation } from "../../components/search-location";
import { HomeRecommendationCity } from "../../components/home-recommendation-city";

export function RenderHome() {

  const {
    mode,
    setSelectedDate
  } = useSearchStore();

  return (
    <div className="home-page">
      <div className="hero-background-wrapper">
        <div className="hero-gradient-overlay" />
        <Header />
        <Hero />
        <SearchBox />
      </div>
      <div className="home-page-content-wrapper">
        {mode !== undefined && (
          <div className="search-popup-wrapper">
            <div className="search-popup-container">
              {mode === "location" && <SearchLocation />}
              {mode === "date" && (
                <DateRangePicker onChange={(range) => setSelectedDate(range)} />
              )}
              {mode === "room-guest" && <RoomGuestCount />}
            </div>
          </div>
        )}

        <HomeRecommendationCity />
      </div>
    </div>
  );
}
