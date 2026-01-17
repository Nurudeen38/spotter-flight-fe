import type { FlightSearchParams } from "../types";
import { apiClient } from "../utils";
import { MAX_FLIGHT_RESULTS, CITY_SEARCH_MIN_LENGTH } from "../constants";

const MAX_CITY_RESULTS = 10;

export const searchCities = (query: string) => {
  if (query.length < CITY_SEARCH_MIN_LENGTH) {
    return Promise.resolve({ data: { data: [] } });
  }

  return apiClient.get("/v1/reference-data/locations/cities", {
    params: {
      keyword: query,
      max: MAX_CITY_RESULTS,
      include: "AIRPORTS"
    },
  });
};

export const searchFlights = (params: FlightSearchParams) =>
  apiClient.get("/v2/shopping/flight-offers", {
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
