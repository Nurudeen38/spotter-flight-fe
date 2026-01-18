import type { FlightOffer } from "@/types";
import { getTotalDuration, getFlightPrice } from "@/utils/flightUtils";

export type SortOption = "best" | "price_high" | "fastest";

export const sortFlights = (
  flights: FlightOffer[],
  sortBy: SortOption
): FlightOffer[] => {
  const sorted = [...flights];

  switch (sortBy) {
    case "price_high":
      return sorted.sort(
        (a, b) => getFlightPrice(a) - getFlightPrice(b)
      );

    case "fastest":
      return sorted.sort((a, b) => {
        const aDuration = getTotalDuration(a);
        const bDuration = getTotalDuration(b);
        return aDuration - bDuration;
      });

    case "best":
    default:
      // Best = balance of price and duration (lower price per minute is better)
      return sorted.sort((a, b) => {
        const aPrice = getFlightPrice(a);
        const bPrice = getFlightPrice(b);
        const aDuration = getTotalDuration(a);
        const bDuration = getTotalDuration(b);

        // Normalize: price per minute (lower is better)
        const aScore = aPrice / Math.max(aDuration, 1);
        const bScore = bPrice / Math.max(bDuration, 1);
        return aScore - bScore;
      });
  }
};

