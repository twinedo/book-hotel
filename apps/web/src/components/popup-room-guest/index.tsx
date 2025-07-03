import React, { useState } from "react";
import { Popup } from "../popup";
import { BiDoorOpen, BiSearch } from "react-icons/bi";
import "./styles.css";
import { BsPerson } from "react-icons/bs";

export function PopupRoomGuest() {
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <div style={{flex: 1}}>
      <Popup
        position="bottom"
        isShowPopup={isShowPopup}
        mainComponent={
          <div className="popup-room-guest-wrapper" onClick={() => setIsShowPopup(!isShowPopup)}>
            <BiDoorOpen size={16} />
            <div className="font-medium">Rooms</div>
            <BsPerson size={16} />
            <div className="font-medium">Guests</div>
          </div>
        }
      >
        <div>Test</div>
      </Popup>
    </div>
  );
}
