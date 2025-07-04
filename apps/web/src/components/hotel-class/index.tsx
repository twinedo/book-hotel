import React from "react";
import { FaStar } from "react-icons/fa";
import './styles.css'

export function HotelClass({ star }: { star: number }) {
  return (
    <div className="card-hotel-class-list">
      {Array(star)
        .fill("")
        .map(() => (
          <FaStar size={16} color="yellow" />
        ))}
    </div>
  );
}
