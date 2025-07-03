import React from "react";
import { BiSearch } from "react-icons/bi";
import "./styles.css";
import useSearchStore from "../../store/search-store";

export function PopupSearch() {
  const selectedLocation = useSearchStore((state) => state.selectedLocation);
  const setMode = useSearchStore((state) => state.setMode);
  const mode = useSearchStore((state) => state.mode);

  const onClickField = () => {
    if (mode === "location") {
      setMode(undefined);
    } else {
      setMode("location");
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <div className="popup-search-wrapper" onClick={onClickField}>
        <BiSearch size={16} />
        <div className="font-medium">
          {selectedLocation === '' ? "Find city, hotels..." : selectedLocation}
        </div>
      </div>
    </div>
  );
}
