import React from "react";
import { BiDoorOpen } from "react-icons/bi";
import "./styles.css";
import { BsPerson } from "react-icons/bs";
import useSearchStore from "../../store/search-store";

export function PopupRoomGuest() {
  const { rooms, guests } = useSearchStore((state) => state.selectedRoomGuest);
  const setMode = useSearchStore((state) => state.setMode);
  const mode = useSearchStore((state) => state.mode);

  const onClickField = () => {
    if (mode === "room-guest") {
      setMode(undefined);
    } else {
      setMode("room-guest");
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <div className="popup-room-guest-wrapper" onClick={onClickField}>
        <BiDoorOpen size={16} />
        <div className="font-medium">{rooms} Rooms</div>
        <BsPerson size={16} />
        <div className="font-medium">{guests} Guests</div>
      </div>
    </div>
  );
}
