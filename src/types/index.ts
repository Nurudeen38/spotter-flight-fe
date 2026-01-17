/**
 * Centralized type definitions for better type safety and reusability
 */

export type TripType = "one-way" | "round-trip";
export type CabinClass = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
export type TravelClass = CabinClass; // Alias for consistency

export interface FlightSearchParams {
  originIataCode: string;
  destinationIataCode: string;
  date: string;
  returnDate?: string;
  currency?: string;
  adults?: number;
  originEntityId: string;
  destinationEntityId: string;
  sortBy?: string;
  travelClass?: TravelClass | string; // Allow string for URL params but prefer strict type
}

export interface FlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  isUpsellOffer: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: {
    currency: string;
    total: string;
    base: string;
    fees: { amount: string; type: string }[];
    grandTotal: string;
  };
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  departure: { iataCode: string; at: string };
  arrival: { iataCode: string; at: string };
  carrierCode: string;
  number: string;
  aircraft: { code: string };
  operating: { carrierCode: string };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: { currency: string; total: string; base: string };
  fareDetailsBySegment: FareDetail[];
}

export interface FareDetail {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  class: string;
  includedCheckedBags: { weight: number; weightUnit: string };
  includedCabinBags: { quantity: number };
}

export interface City {
  type: string;
  subType: string;
  name: string;
  iataCode: string;
  address: {
    countryCode: string;
    stateCode?: string;
  };
  geoCode?: {
    latitude?: number;
    longitude?: number;
  };
}

export interface FlightFilters {
  stops: number | null; // null means "any", 0 means "non-stop", 1+ means that many stops
  priceRange: {
    min: number | null;
    max: number | null;
  };
  airlines: string[]; // Array of airline codes to filter by
}

export interface CarrierDictionary {
  [carrierCode: string]: string;
}

export interface LocationDictionary {
  [locationCode: string]: {
    cityCode: string;
    countryCode: string;
  };
}

export interface AircraftDictionary {
  [aircraftCode: string]: string;
}

export interface CurrencyDictionary {
  [currencyCode: string]: string;
}

export interface ApiDictionaries {
  locations: LocationDictionary;
  aircraft: AircraftDictionary;
  currencies: CurrencyDictionary;
  carriers: CarrierDictionary;
}

export interface FlightSearchResponse {
  meta: {
    count: number;
    links: {
      self: string;
    };
  };
  data: FlightOffer[];
  dictionaries: ApiDictionaries;
}

// Re-export specific types from other files if needed, or import them here to consolidate
// For now, we are defining base types here to avoid circular deps if schema imports this.

export type SortOption = "price" | "duration" | "date";

// From urlUtils
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
