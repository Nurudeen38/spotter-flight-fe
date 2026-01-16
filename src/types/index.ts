/**
 * Centralized type definitions for better type safety and reusability
 */

export type { FlightSearchParams, FlightOffer, FlightFilters, City } from "../interfaces";
export type { TripType, FlightFormSchema, FlightFormValues } from "../schemas/flightFormSchema";
export type { SortOption } from "../utils/flightSorting";
export type {
  FlightSearchUrlParams,
  FlightFormData,
} from "../utils/urlUtils";

