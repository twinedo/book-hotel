import React, { useState } from "react";
import { Popup } from "../popup";
import { BiCalendar } from "react-icons/bi";
import "./styles.css";

export function PopupDate() {
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <div style={{ flex: 1 }}>
      <Popup
        position="bottom"
        isShowPopup={isShowPopup}
        mainComponent={
          <div className="popup-date-wrapper" onClick={() => setIsShowPopup(!isShowPopup)}>
            <BiCalendar size={16} />
            <div className="font-medium">Date </div>
          </div>
        }
      >
        <div>Test</div>
      </Popup>
    </div>
  );
}
