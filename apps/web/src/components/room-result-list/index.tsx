import React from "react";
import { citySuggestions } from "../../utils/const";
import "./styles.css";
import { HotelClass } from "../hotel-class";
import { MdFreeBreakfast } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { FaWifi, FaParking } from "react-icons/fa";

export function RoomResultList() {
  return (
    <div className="room-result-list-wrapper">
      {Array(3)
        .fill("")
        .map((_, i) => (
          <div key={i} className="room-result-list-item">
            <img
              src={citySuggestions[i].imageSource}
              className="list-item-image"
            />
            <div className="list-item-info-wrapper">
              <div className="hotel-title">Hotel Jakarta</div>
              <HotelClass star={4} />
              <div>4.5/5.0 (1,000 reviews)</div>
              <div>
                <h3>Facilities</h3>
                <div className="grid-facilities">
                  <div>
                    <MdFreeBreakfast size={18} /> Breakfast
                  </div>
                  <div>
                    <TbAirConditioning size={18} />
                    Air Conditioner
                  </div>
                  <div>
                    <FaWifi size={18} /> WiFi
                  </div>
                  <div>
                    <FaParking size={18} /> Parking
                  </div>
                </div>
              </div>
            </div>
            <div className="list-item-info-wrapper">
              <div className="row">
                <h2>S$300</h2>
                <p>/ night</p>
              </div>
              <div className="button-search">Book Room</div>
            </div>
          </div>
        ))}
    </div>
  );
}
