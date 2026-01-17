import type { FlightSearchParams, City } from "../types";
import { format } from "date-fns";

export interface FlightSearchUrlParams {
  originIataCode?: string | null;
  destinationIataCode?: string | null;
  departureDate?: string | null;
  returnDate?: string | null;
  adults?: string | null;
  originCountryCode?: string | null;
  destinationCountryCode?: string | null;
  originEntityId?: string | null;
  destinationEntityId?: string | null;
  travelClass?: string | null;
}

export interface FlightFormData {
  originIataCode: string;
  destinationIataCode: string;
  departureDate: string;
  returnDate?: string | null;
  adults: number;
  originEntityId: string;
  destinationEntityId: string;
  originCountryCode: string;
  destinationCountryCode: string;
  travelClass: string;
}

/**
 * Parses URL search params into FlightSearchParams for API calls
 */
export const parseSearchParams = (
  searchParams: URLSearchParams
): FlightSearchParams | null => {
  const originIataCode = searchParams.get("originIataCode");
  const destinationIataCode = searchParams.get("destinationIataCode");
  const departureDate = searchParams.get("departureDate");
  const originEntityId = searchParams.get("originEntityId");
  const destinationEntityId = searchParams.get("destinationEntityId");
  const travelClass = searchParams.get("travelClass");

  if (
    !originIataCode ||
    !destinationIataCode ||
    !departureDate ||
    !originEntityId ||
    !destinationEntityId || !travelClass
  ) {
    return null;
  }

  return {
    originIataCode,
    destinationIataCode,
    date: departureDate,
    travelClass,
    returnDate: searchParams.get("returnDate") || undefined,
    currency: "USD",
    adults: Number(searchParams.get("adults")) || 1,
    originEntityId,
    destinationEntityId,
  };
};

/**
 * Extracts all flight search params from URL
 */
export const extractFlightSearchParams = (
  searchParams: URLSearchParams
): FlightSearchUrlParams => {
  return {
    originIataCode: searchParams.get("originIataCode"),
    destinationIataCode: searchParams.get("destinationIataCode"),
    departureDate: searchParams.get("departureDate"),
    returnDate: searchParams.get("returnDate"),
    travelClass: searchParams.get("travelClass"),
    adults: searchParams.get("adults"),
    originCountryCode: searchParams.get("originCountryCode"),
    destinationCountryCode: searchParams.get("destinationCountryCode"),
    originEntityId: searchParams.get("originEntityId"),
    destinationEntityId: searchParams.get("destinationEntityId"),
  };
};

/**
 * Converts form data to URL search params
 */
export const buildFlightSearchUrl = (formData: FlightFormData): string => {
  const params = new URLSearchParams();

  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null && value !== "" && value !== undefined) {
      params.append(key, String(value));
    }
  });

  return params.toString();
};

/**
 * Creates a minimal city object from IATA code and optional country code
 */
export const createMinimalCity = (
  iataCode: string,
  countryCode?: string | null
): City => ({
  iataCode,
  name: iataCode,
  type: "location",
  subType: "city",
  address: {
    countryCode: countryCode || "",
    stateCode: "",
  },
  geoCode: {},
});

/**
 * Formats date to YYYY-MM-DD format
 */
export const formatDateForUrl = (date: Date | null | undefined): string | null => {
  if (!date) return null;
  return format(date, "yyyy-MM-dd");
};

