import { useQuery } from "@tanstack/react-query";
import { searchCities } from "../services";
import { QUERY_KEYS, CITY_SEARCH_MIN_LENGTH } from "../constants";

const CACHE_TIME_MS = 1000 * 60 * 60; // 1 hour

export const useCitySearch = (query: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CITIES, query],
    queryFn: () =>
      query.length < CITY_SEARCH_MIN_LENGTH
        ? []
        : searchCities(query).then((r) => r.data),
    enabled: !!query,
    retry: false,
    staleTime: CACHE_TIME_MS,
  });
};
