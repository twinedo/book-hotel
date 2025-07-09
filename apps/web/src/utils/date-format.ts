import { format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

export const formatBookingDates = (startDate: Date, endDate: Date) => {
  const timeZone = 'Asia/Jakarta'; // WIB timezone
  
  // Convert to target timezone while preserving the local time values
  const zonedStart = toZonedTime(startDate, timeZone);
  const zonedEnd = toZonedTime(endDate, timeZone);
  
  // Format start date with current time (in UTC)
  const formattedStart = format(fromZonedTime(zonedStart, timeZone), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  
  // Always set end date to 12:00:00 (noon) in the specified timezone
  const endAtNoon = fromZonedTime(
    new Date(
      zonedEnd.getFullYear(),
      zonedEnd.getMonth(),
      zonedEnd.getDate(),
      12, 0, 0 // Fixed at 12:00:00
    ),
    timeZone
  );
  
  const formattedEnd = format(endAtNoon, "yyyy-MM-dd'T'HH:mm:ss'Z'");
  
  return {
    start: formattedStart,
    end: formattedEnd
  };
};