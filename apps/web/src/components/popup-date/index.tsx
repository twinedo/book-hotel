import React from "react";
import { BiCalendar } from "react-icons/bi";
import useSearchStore from "../../store/search-store";
import "./styles.css";
import { format } from "date-fns";

export function PopupDate() {
  const { start, end } = useSearchStore((state) => state.selectedDate);
  const setMode = useSearchStore((state) => state.setMode);
  const mode = useSearchStore((state) => state.mode);

  const onClickField = () => {
    if (mode === "date") {
      setMode(undefined);
    } else {
      setMode("date");
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <div className="popup-date-wrapper" onClick={onClickField}>
        <BiCalendar size={16} />
        <div className="font-medium">
          Date {start instanceof Date ? format(start, "MMM dd") : ""}{" "}
          {start && end && "-"} {end instanceof Date ? format(end, "MMM dd") : ""}
        </div>
      </div>
    </div>
  );
}
