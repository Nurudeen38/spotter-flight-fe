export const DEFAULT_PASSENGERS = 1;
export const DEFAULT_TRIP_TYPE = "round-trip" as const;
export const DEFAULT_SORT_OPTION = "best" as const;

export const TRIP_TYPES = {
  ONE_WAY: "one-way",
  ROUND_TRIP: "round-trip",
} as const;

export const SORT_OPTIONS = {
  BEST: "best",
  PRICE_HIGH: "price_high",
  FASTEST: "fastest",
} as const;

export const CABIN_CLASS = {
  ECONOMY: "ECONOMY",
  PREMIUM_ECONOMY: "PREMIUM_ECONOMY",
  BUSINESS: "BUSINESS",
  FIRST: "FIRST",
} as const;

export const CABIN_CLASS_OPTIONS = [
  { value: CABIN_CLASS.ECONOMY, label: "Economy" },
  { value: CABIN_CLASS.PREMIUM_ECONOMY, label: "Premium Economy" },
  { value: CABIN_CLASS.BUSINESS, label: "Business" },
  { value: CABIN_CLASS.FIRST, label: "First Class" },
] as const;

export const DEFAULT_CABIN_CLASS = CABIN_CLASS.ECONOMY;

export const DEBOUNCE_DELAY_MS = 500;
export const CITY_SEARCH_MIN_LENGTH = 2;
export const MAX_FLIGHT_RESULTS = 50;

