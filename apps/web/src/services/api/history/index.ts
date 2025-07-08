import { BASE_URL } from "../../config";

export const getHistory = async (
  email: string,
  type: "upcoming" | "past" | "all" = "all"
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/bookings/history?email=${email}&type=${type}`
    );
    const resData = await response.json();
    return resData;
  } catch (error) {
    return error;
  }
};

export const cancelBooking = async (bookingId: string, email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings/${bookingId}/cancel?email=${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = response.json()
    return resData;
  } catch (error) {
    return error;
  }
};
