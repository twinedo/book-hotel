import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export type DateRange = {
  start: Value;
  end: Value;
};

type DateRangePickerProps = {
  onChange: (range: DateRange) => void;
  initialRange?: DateRange;
};

export const DateRangePicker = ({
  onChange,
  initialRange,
}: DateRangePickerProps) => {
  const [dateRange, setDateRange] = useState<DateRange>(
    initialRange || { start: new Date(), end: new Date() }
  );

  const handleStartDateChange = (date: Value) => {
    const newRange = { ...dateRange, start: date };
    if (newRange.end && date && date > newRange.end) {
      newRange.end = null;
    }
    setDateRange(newRange);
    onChange(newRange);
  };

  const handleEndDateChange = (date: Value) => {
    const newRange = { ...dateRange, end: date };
    setDateRange(newRange);
    onChange(newRange);
  };

  return (
    <div>
      <h3>Select Your Date Range</h3>
      <div className="calendar-container">
        <div className="calendar-section">
          <h3>Start</h3>
          <Calendar
            onChange={handleStartDateChange}
            value={dateRange.start}
            selectRange={false}
          />
        </div>

        <div className="calendar-section">
          <h3>End</h3>
          <Calendar
            onChange={handleEndDateChange}
            value={dateRange.end}
            minDate={
              dateRange.start instanceof Date ? dateRange.start : undefined
            }
            selectRange={false}
          />
        </div>
      </div>
    </div>
  );
};
