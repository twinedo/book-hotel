import React from "react";
import "./styles.css";
import { citySuggestions } from "../../utils/const";
import { CardHotel } from "../card-hotel";

export function HomeRecommendationCity() {
  return (
    <div className="home-recommendation-city-wrapper">
      <h2>Recommendation City</h2>
      <div className="home-recommendation-city-list">
        {citySuggestions.map((item) => (
          <div className="home-recommendation-city-card">
            <div className="home-recommendation-city-text">{item.city}</div>
            <img
              src={item.imageSource}
              className="home-recommendation-city-photo"
            />
          </div>
        ))}
      </div>

      <div>
        <h2>Hotel of the week</h2>
        <div className="home-week-list">
          {citySuggestions.slice(0, 3).map((item) => (
            <div key={item.id}>
              <CardHotel
                imageSource={item.imageSource}
                title={`Hotel ${item.city}`}
                rating={4.8}
                hotelClass={4}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
