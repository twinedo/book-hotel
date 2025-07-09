import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.css";

export type ValuePiece = Date | null;
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

  const addDay = (date: Date): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + 1);
    return result;
  };

  const handleStartDateChange = (date: Value) => {
    if (!date) return;
    
    const startDate = Array.isArray(date) ? date[0] : date;
    const endDate = startDate ? addDay(startDate) : null;
    
    const newRange = { 
      start: startDate, 
      end: endDate 
    };
    
    setDateRange(newRange);
    onChange(newRange);
  };

  const handleEndDateChange = (date: Value) => {
    if (!date) return;
    
    const endDate = Array.isArray(date) ? date[0] : date;
    const newRange = { 
      ...dateRange, 
      end: endDate 
    };
    
    // Ensure end date is not before start date
    if (dateRange.start && endDate && endDate <= dateRange.start) {
      newRange.end = addDay(dateRange.start as Date);
    }
    
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
              dateRange.start instanceof Date 
                ? addDay(dateRange.start)
                : undefined
            }
            selectRange={false}
          />
        </div>
      </div>
    </div>
  );
};