import { Hotel } from "~repo-shared";
import { BASE_URL } from "../../config";

export const getHotels = async () => {
  try {
    const response = await fetch(`${BASE_URL}/hotels`);
    const data = await response.json()

    return data as Hotel[];
  } catch (error) {
    console.error(error);
    return []
  }
};
