import { useState, useMemo } from "react";
import type { FlightOffer, FlightFilters } from "../types";
import { filterFlights, calculateFlightMetadata } from "../utils/flightFiltering";
import { DEFAULT_SORT_OPTION } from "../constants/flightConstants";
import type { SortOption } from "../utils/flightSorting";
import { sortFlights } from "../utils/flightSorting";

export interface UseFlightFiltersReturn {
  filters: FlightFilters;
  setFilters: (filters: FlightFilters) => void;
  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;
  filteredAndSortedFlights: FlightOffer[];
  availableAirlines: string[];
  priceRange: { min: number; max: number };
  activeFiltersCount: number;
  airlinesCount: number;
}

/**
 * Custom hook for managing flight filters and sorting
 */
export const useFlightFilters = (
  flights: FlightOffer[]
): UseFlightFiltersReturn => {
  const [filters, setFilters] = useState<FlightFilters>({
    stops: null,
    priceRange: { min: null, max: null },
    airlines: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>(DEFAULT_SORT_OPTION);

  // Calculate available airlines and price range from raw flights
  const { availableAirlines, priceRange } = useMemo(
    () => calculateFlightMetadata(flights),
    [flights]
  );

  // Apply filters
  const filteredFlights = useMemo(
    () => filterFlights(flights, filters),
    [flights, filters]
  );

  // Sort filtered flights
  const filteredAndSortedFlights = useMemo(
    () => sortFlights(filteredFlights, sortBy),
    [filteredFlights, sortBy]
  );

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.stops !== null) count++;
    if (filters.priceRange.min !== null || filters.priceRange.max !== null)
      count++;
    if (filters.airlines.length > 0) count += filters.airlines.length;
    return count;
  }, [filters]);

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredAndSortedFlights,
    availableAirlines,
    priceRange,
    activeFiltersCount,
    airlinesCount: availableAirlines.length,
  };
};

