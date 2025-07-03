import React from "react";
import { Counter } from "../counter";
import './styles.css'

export function RoomGuestCount() {
  return (
    <div className="room-guest-wrapper">
      <h3>Rooms & Guests</h3>
      <div className="room-guest-item-wrapper">
        <div className="room-guest-item">
          <div>Rooms</div>
          <Counter
            initialValue={1}
            min={1}
            max={10}
            step={1}
            onChange={(value) => {}}
          />
        </div>
        <div className="room-guest-item">
          <div>Guests</div>
          <Counter
            initialValue={1}
            min={1}
            max={10}
            step={1}
            onChange={(value) => {}}
          />
        </div>
      </div>
    </div>
  );
}
