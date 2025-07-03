import React, { useState } from "react";
import { Popup } from "../popup";
import { BiSearch } from "react-icons/bi";
import "./styles.css";

export function PopupSearch() {
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <div style={{ flex: 1 }}>
      <Popup
        position="bottom"
        isShowPopup={isShowPopup}
        mainComponent={
          <div
            className="popup-search-wrapper"
            onClick={() => setIsShowPopup(!isShowPopup)}
          >
            <BiSearch size={16} />
            <div className="font-medium">Find city, hotels, </div>
          </div>
        }
      >
        <div>Test</div>
      </Popup>
    </div>
  );
}
