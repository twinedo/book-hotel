import { useEffect, useState } from "react";
import { getHotels } from "../services/api/recommendations";
import type { Hotel } from "~repo-shared";

export function useRecommendation() {
  const [cities, setCities] = useState<Partial<Hotel>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const response = await getHotels();
        setTimeout(() => {
          setIsLoading(false);
          const newArr: Partial<Hotel>[] = [];

          response?.map((val) => {
            const item = {
              id: val.id,
              city: val.city,
              images: val.images,
            };
            newArr.push(item);
          });
          setCities(newArr);
        }, 1000);
      } catch (error: unknown) {
        setError(error?.toString());
      }
    };
    getData();
  }, []);

  return { cities, isLoading, error };
}
