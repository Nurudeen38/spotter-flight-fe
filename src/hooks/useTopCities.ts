import { useQuery } from "@tanstack/react-query";
import { searchCities } from "../services";
import { QUERY_KEYS } from "../constants";

const DEFAULT_CITY = "LON";
const CACHE_TIME_MS = 1000 * 60 * 60; // 1 hour

export const useTopCities = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CITIES, "top"],
    queryFn: () => searchCities(DEFAULT_CITY).then((r) => r.data?.data),
    staleTime: CACHE_TIME_MS,
  });
};
