import { format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

// Helper function to format dates according to your requirements
export const formatBookingDates = (startDate: Date, endDate: Date) => {
  const timeZone = 'Asia/Jakarta'; // WIB timezone
  
  // Convert to UTC while preserving the local time
  const zonedStart = toZonedTime(startDate, timeZone);
  const zonedEnd = toZonedTime(endDate, timeZone);
  
  // Check if dates are the same day (local time)
  const isSameDay = format(zonedStart, 'yyyy-MM-dd') === format(zonedEnd, 'yyyy-MM-dd');
  
  let formattedStart: string;
  let formattedEnd: string;
  
  if (isSameDay) {
    // For same day: start = current UTC time, end = next day at 12:00 UTC
    const now = new Date();
    formattedStart = format(now, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    
    const nextDayNoonUTC = fromZonedTime(
      new Date(
        zonedStart.getFullYear(),
        zonedStart.getMonth(),
        zonedStart.getDate() + 1,
        12, 0, 0
      ),
      timeZone
    );
    formattedEnd = format(nextDayNoonUTC, "yyyy-MM-dd'T'HH:mm:ss'Z'");
  } else {
    // For different days: keep original dates but format to UTC
    formattedStart = format(fromZonedTime(zonedStart, timeZone), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    formattedEnd = format(fromZonedTime(zonedEnd, timeZone), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  }
  
  return {
    start: formattedStart,
    end: formattedEnd
  };
};

// Usage example:
const startDate = new Date('Mon Jul 07 2025 00:00:00 GMT+0700 (Waktu Indonesia Barat)');
const endDate = new Date('Mon Jul 07 2025 00:00:00 GMT+0700 (Waktu Indonesia Barat)');

const formattedDates = formatBookingDates(startDate, endDate);
console.log(formattedDates);
// Output when run on 2025-07-07 at 09:32:28 UTC:
// {
//   start: "2025-07-07T09:32:28Z",
//   end: "2025-07-08T12:00:00Z"
// }