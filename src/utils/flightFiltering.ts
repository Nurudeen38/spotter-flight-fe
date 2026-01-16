import type { FlightOffer, FlightFilters } from "../interfaces";
import { getTotalStops, getPrimaryAirline, getFlightPrice } from "./flightUtils";

/**
 * Filters flight offers based on provided filters
 */
export const filterFlights = (
  flights: FlightOffer[],
  filters: FlightFilters
): FlightOffer[] => {
  let filtered = [...flights];

  // Filter by stops
  if (filters.stops !== null) {
    if (filters.stops === 2) {
      // 2+ stops means 2 or more
      filtered = filtered.filter((offer) => getTotalStops(offer) >= 2);
    } else {
      filtered = filtered.filter(
        (offer) => getTotalStops(offer) === filters.stops
      );
    }
  }

  // Filter by price range
  if (filters.priceRange.min !== null) {
    filtered = filtered.filter(
      (offer) => getFlightPrice(offer) >= filters.priceRange.min!
    );
  }
  if (filters.priceRange.max !== null) {
    filtered = filtered.filter(
      (offer) => getFlightPrice(offer) <= filters.priceRange.max!
    );
  }

  // Filter by airlines
  if (filters.airlines.length > 0) {
    filtered = filtered.filter((offer) =>
      filters.airlines.includes(getPrimaryAirline(offer))
    );
  }

  return filtered;
};

/**
 * Calculates available airlines and price range from flight offers
 */
export const calculateFlightMetadata = (flights: FlightOffer[]) => {
  if (flights.length === 0) {
    return { availableAirlines: [], priceRange: { min: 0, max: 0 } };
  }

  const airlinesSet = new Set<string>();
  const prices: number[] = [];

  flights.forEach((offer) => {
    const airline = getPrimaryAirline(offer);
    if (airline) airlinesSet.add(airline);
    prices.push(getFlightPrice(offer));
  });

  const sortedPrices = prices.sort((a, b) => a - b);
  return {
    availableAirlines: Array.from(airlinesSet).sort(),
    priceRange: {
      min: Math.floor(sortedPrices[0] || 0),
      max: Math.ceil(sortedPrices[sortedPrices.length - 1] || 0),
    },
  };
};

