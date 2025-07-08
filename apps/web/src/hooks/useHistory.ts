import { useEffect, useState } from "react";
import { getHistory } from "../services/api/history";
import type { Booking } from "~repo-shared";

export function useHistory(email: string, type: 'upcoming' | 'past' | 'all') {
  const [history, setHistory] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const refetch = () => getData()

  const getData = async () => {
      try {
        const response = await getHistory(email, type);
        setTimeout(() => {
          setIsLoading(false);
          setHistory(response.bookings);
        }, 1000);
      } catch (error: unknown) {
        setError(error?.toString());
      }
    };

  useEffect(() => {
    setIsLoading(true);
    
    getData();
  }, []);

  return {
    history,
    isLoading,
    error,
    refetch,
  };
}
