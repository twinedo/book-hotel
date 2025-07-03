import React, { useCallback } from "react";
import { Counter } from "../counter";
import "./styles.css";
import useSearchStore from "../../store/search-store";

export function RoomGuestCount() {
  const setSelectedRoomGuest = useSearchStore(
    (state) => state.setSelectedRoomGuest
  );

  const { rooms, guests } = useSearchStore((state) => state.selectedRoomGuest);

  const handleRoomChange = useCallback((value: number) => {
    setSelectedRoomGuest({ rooms: value, guests });
  }, [guests, setSelectedRoomGuest]);

  const handleGuestChange = useCallback((value: number) => {
    setSelectedRoomGuest({ guests: value, rooms });
  }, [rooms, setSelectedRoomGuest]);

  return (
    <div className="room-guest-wrapper">
      <h3>Rooms & Guests</h3>
      <div className="room-guest-item-wrapper">
        <div className="room-guest-item">
          <div>Rooms</div>
          <Counter
            initialValue={rooms}
            min={1}
            max={10}
            step={1}
            onChange={handleRoomChange}
          />
        </div>
        <div className="room-guest-item">
          <div>Guests</div>
          <Counter
            initialValue={guests}
            min={1}
            max={10}
            step={1}
            onChange={handleGuestChange}
          />
        </div>
      </div>
    </div>
  );
}
