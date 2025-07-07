import React from "react";
import "./styles.css";
import { CardHotel } from "../card-hotel";
import { useRecommendation } from "../../hooks/useRecommendations";
import useSearchStore from "../../store/search-store";

export function HomeRecommendationCity() {
  const { cities, isLoading, error } = useRecommendation();
  const { setSelectedLocation } = useSearchStore();

  const onSelectCity = (city: string) => {
    setSelectedLocation(city);
  };

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="home-recommendation-city-wrapper">
      <h2>Recommendation City</h2>

      {isLoading && <div>Loading...</div>}
      {!isLoading && cities && (
        <div className="home-recommendation-city-list">
          {cities.map((item) => (
            <div
              className="home-recommendation-city-card"
              key={item.id}
              onClick={() => onSelectCity(item.city!)}
            >
              <div className="home-recommendation-city-text">{item.city}</div>
              <img
                src={item.images}
                className="home-recommendation-city-photo"
              />
            </div>
          ))}
        </div>
      )}

      <div className="column gap-y-2">
        <h2>Hotel of the week</h2>
        {isLoading && <div>Loading...</div>}
        {!isLoading && cities && (
          <div className="home-week-list">
            {cities.slice(0, 3).map((item) => (
              <div key={item.id} style={{ cursor: "pointer" }} onClick={() => onSelectCity(item.city!)}>
                <CardHotel
                  imageSource={item.images}
                  title={`Hotel ${item.city}`}
                  rating={4.8}
                  hotelClass={4}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
