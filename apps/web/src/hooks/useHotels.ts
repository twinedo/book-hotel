import { useEffect, useState } from "react";
import { getHotels } from "../services/api/recommendations";
import type {Hotel} from '~repo-shared'

export function useHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [filteredHotelByCities, setFilteredHotelByCities] = useState<Hotel[]>([])

  const filterByCity = (city: string) => {
    if (hotels.length > 0) {
      const filter = hotels.filter(item => item.city.toLowerCase().includes(city.toLowerCase()));
      setFilteredHotelByCities(filter);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const response = await getHotels();
        setTimeout(() => {
          setIsLoading(false);
          setHotels(response);
        }, 1000);
      } catch (error: unknown) {
        setError(error?.toString());
      }
    };
    getData();
  }, []);

  return { hotels, isLoading, error, filterByCity, filteredHotelByCities, setFilteredHotelByCities };
}
