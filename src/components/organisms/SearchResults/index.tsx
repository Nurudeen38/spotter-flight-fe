import { useState } from "react";
import { Plane } from "lucide-react";
import { Skeleton } from "@mui/material";
import {
    FilterBar,
    FlightCard,
    PriceGraph,
    FlightDetailsModal,
} from "@/components";
import { LoadingSkeleton, EmptyState, ErrorState } from "@/components/shared";
import { useFlightSearchContext } from "@/context/FlightSearchContext";
import type { FlightOffer } from "@/types";
import {
    ResultsSection,
    EmptyStateWrapper,
    EmptyIcon,
    EmptyTitle,
    EmptyDescription,
    ResultsInfo,
    PaginationContainer,
    StyledPagination,
} from "@/pages/SearchPage/styled";

export const SearchResults = () => {
    const {
        hasSearched,
        isLoading,
        isFetching,
        isError,
        refetch,
        sortedFlights,
        paginatedFlights,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        availableAirlines,
        priceRange,
        rawCarrierDictionary,
        rawAircraftDictionary,
        handleFlightClick,
        currentPage,
        totalPages,
        handlePageChange,
        resultsRef,
    } = useFlightSearchContext();

    const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFlightSelect = (flight: FlightOffer) => {
        setSelectedFlight(flight);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFlight(null);
    };

    return (
        <>
            <ResultsSection ref={resultsRef}>
                {!hasSearched ? (
                    <EmptyStateWrapper>
                        <EmptyIcon>
                            <Plane size={48} />
                        </EmptyIcon>
                        <EmptyTitle>Search for Flights</EmptyTitle>
                        <EmptyDescription>
                            Enter your origin, destination, and travel dates to find the best flight deals. Use filters to narrow down results.
                        </EmptyDescription>
                    </EmptyStateWrapper>
                ) : isError ? (
                    <ErrorState
                        onRetry={() => refetch()}
                        message="We encountered an issue while searching for flights. Please check your connection and try again."
                    />
                ) : isLoading || isFetching ? (
                    <LoadingSkeleton>
                        <Skeleton variant="rectangular" width="100%" height={80} />
                        <Skeleton variant="rectangular" width="100%" height={200} />
                        <Skeleton variant="rectangular" width="100%" height={100} />
                        <Skeleton variant="rectangular" width="100%" height={100} />
                        <Skeleton variant="rectangular" width="100%" height={100} />
                    </LoadingSkeleton>
                ) : (
                    <>
                        <FilterBar
                            sortBy={sortBy}
                            onSortByChange={setSortBy}
                            filters={filters}
                            onFiltersChange={setFilters}
                            availableAirlines={availableAirlines}
                            priceRange={priceRange}
                            carrierDictionary={rawCarrierDictionary}
                        />

                        {sortedFlights.length > 0 ? (
                            <>
                                <PriceGraph
                                    flightOffers={sortedFlights}
                                    onFlightClick={handleFlightClick}
                                />
                                <ResultsInfo>
                                    {sortedFlights.length} flight{sortedFlights.length !== 1 ? "s" : ""} found
                                </ResultsInfo>
                                {paginatedFlights.map((it: FlightOffer) => (
                                    <FlightCard
                                        key={it.id}
                                        flightOffer={it}
                                        carrierDictionary={rawCarrierDictionary}
                                        aircraftDictionary={rawAircraftDictionary}
                                        id={`flight-card-${it.id}`}
                                        onSelect={handleFlightSelect}
                                    />
                                ))}
                                {totalPages > 1 && (
                                    <PaginationContainer>
                                        <StyledPagination
                                            count={totalPages}
                                            page={currentPage}
                                            onChange={(_event: any, page: number) => handlePageChange(page)}
                                            color="primary"
                                            showFirstButton
                                            showLastButton
                                            variant="outlined"
                                            shape="rounded"
                                        />
                                    </PaginationContainer>
                                )}
                            </>
                        ) : (
                            <EmptyState>
                                No flights match your search criteria. Try adjusting your dates or destinations.
                            </EmptyState>
                        )}
                    </>
                )}
            </ResultsSection>

            <FlightDetailsModal
                open={isModalOpen}
                onClose={handleCloseModal}
                flightOffer={selectedFlight}
                carrierDictionary={rawCarrierDictionary}
                aircraftDictionary={rawAircraftDictionary}
            />
        </>
    );
};
