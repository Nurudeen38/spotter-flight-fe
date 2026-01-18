import { createContext, useContext, useRef, useEffect } from "react";
import type { ReactNode, RefObject } from "react";
import {
    useFlightSearch,
    useFlightFilters,
    usePagination,
    useFlightSearchState,
    useScrollToFlight,
} from "@/hooks";
import { FORM_DEFAULTS } from "@/constants";
import type { FlightOffer, FlightFilters, SortOption } from "@/types";

interface FlightSearchContextType {
    // Search State
    hasSearched: boolean;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    refetch: () => void;

    // Data
    sortedFlights: FlightOffer[];
    paginatedFlights: FlightOffer[];
    rawCarrierDictionary: Record<string, string>;
    rawAircraftDictionary: Record<string, string>;

    // Filters & Sort
    filters: FlightFilters;
    setFilters: (filters: FlightFilters) => void;
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
    availableAirlines: string[];
    priceRange: { min: number; max: number };

    // Pagination
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;

    // Utils
    handleFlightClick: (flightId: string) => void;
    resultsRef: RefObject<HTMLDivElement | null>;

    // Stats
    stats: {
        resultsCount: number;
        airlinesCount: number;
        activeFiltersCount: number;
    };
}

const FlightSearchContext = createContext<FlightSearchContextType | undefined>(undefined);

export const FlightSearchProvider = ({ children }: { children: ReactNode }) => {
    const { queryParams, shouldSearch, hasSearched } = useFlightSearchState();
    const resultsRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to results when search is initiated
    useEffect(() => {
        if (shouldSearch && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [shouldSearch, queryParams]);

    // Fetch flights
    const { data, isLoading, isFetching, isError, refetch } = useFlightSearch(
        shouldSearch ? queryParams : null
    );

    const rawFlightOffers = (data?.data || []) as FlightOffer[];
    const rawCarrierDictionary = (data?.dictionaries?.carriers || {}) as Record<string, string>;
    const rawAircraftDictionary = (data?.dictionaries?.aircraft || {}) as Record<string, string>;

    // Filters and sorting
    const {
        filters,
        setFilters,
        sortBy,
        setSortBy,
        filteredAndSortedFlights: sortedFlights,
        availableAirlines,
        priceRange,
        activeFiltersCount,
        airlinesCount,
    } = useFlightFilters(rawFlightOffers);

    // Pagination
    const {
        currentPage,
        totalPages,
        paginatedItems: paginatedFlights,
        handlePageChange,
    } = usePagination({
        items: sortedFlights,
        itemsPerPage: FORM_DEFAULTS.ITEMS_PER_PAGE,
        dependencies: [filters, sortBy],
    });

    // Scroll to flight logic
    const { handleFlightClick } = useScrollToFlight({
        sortedFlights,
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
    });

    const value = {
        hasSearched,
        isLoading,
        isFetching,
        isError,
        refetch,
        sortedFlights,
        paginatedFlights,
        rawCarrierDictionary,
        rawAircraftDictionary,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        availableAirlines,
        priceRange,
        currentPage,
        totalPages,
        handlePageChange,
        handleFlightClick,
        resultsRef,
        stats: {
            resultsCount: sortedFlights.length,
            airlinesCount,
            activeFiltersCount,
        },
    };

    return (
        <FlightSearchContext.Provider value={value}>
            {children}
        </FlightSearchContext.Provider>
    );
};

export const useFlightSearchContext = () => {
    const context = useContext(FlightSearchContext);
    if (context === undefined) {
        throw new Error("useFlightSearchContext must be used within a FlightSearchProvider");
    }
    return context;
};
