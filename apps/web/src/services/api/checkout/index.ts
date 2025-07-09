import { BASE_URL } from "../../config";
import { BookingFormData } from "~repo-shared";

export const bookingHotel = async (body: BookingFormData) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
