import React from "react";
import { FaStar } from "react-icons/fa";
import "./styles.css";

type CardHotelProps = {
  imageSource?: string;
  title: string;
  rating: number;
  hotelClass: number;
};

export function CardHotel(props: CardHotelProps) {
  const { imageSource, title, rating, hotelClass = 1 } = props;
  return (
    <div className="card-hotel-wrapper">
      <img src={imageSource} className="card-hotel-image" />
      <div className="card-hotel-content">
        <div className="card-hotel-class-list">
          {Array(hotelClass)
            .fill("")
            .map(() => (
              <FaStar size={16} color="yellow" />
            ))}
        </div>
        <h3>{title}</h3>
        <div>{`${rating} / 5.0`}</div>
      </div>
    </div>
  );
}
