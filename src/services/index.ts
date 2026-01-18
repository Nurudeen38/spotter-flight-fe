import type { FlightSearchParams } from "../types";
import { apiClient } from "../utils";
import { MAX_FLIGHT_RESULTS, CITY_SEARCH_MIN_LENGTH, API_ENDPOINTS } from "../constants";

export const searchCities = (query: string) => {
  if (query.length < CITY_SEARCH_MIN_LENGTH) {
    return Promise.resolve({ data: { data: [] } });
  }

  return apiClient.get(API_ENDPOINTS.CITIES, {
    params: {
      keyword: query,
      subType: "CITY,AIRPORT"
    },
  });
};

export const searchFlights = (params: FlightSearchParams) =>
  apiClient.get(API_ENDPOINTS.FLIGHTS, {
    params: {
      originLocationCode: params.originIataCode,
      destinationLocationCode: params.destinationIataCode,
      departureDate: params.date,
      returnDate: params.returnDate,
      adults: params.adults || 1,
      max: MAX_FLIGHT_RESULTS,
      travelClass: params.travelClass,
    },
  });
