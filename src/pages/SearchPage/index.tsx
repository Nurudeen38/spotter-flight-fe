import { useEffect, useRef } from "react";
import { ArrowLeftRight, Search, Plane } from "lucide-react";
import { Skeleton, Select, MenuItem, CircularProgress } from "@mui/material";
import { startOfDay } from "date-fns";
import {
    DatePicker,
    Input,
    InputNumber,
    Radios,
    FilterBar,
    FlightCard,
    PriceGraph,
    FlightDetailsModal,
} from "../../components";
import { useState } from "react";
import { AnalyticsCards } from "../../components/molecules/AnalyticsCards";
import { LoadingSkeleton, EmptyState, ErrorState } from "../../components/shared";
import {
    useFlightFormUrlSync,
    useFlightSearch,
    useFlightFilters,
    usePagination,
    useFlightSearchState,
    useScrollToFlight
} from "../../hooks";
import { buildFlightSearchUrl, buildSearchFormData, isValidFormData } from "../../utils";
import { TRIP_TYPES, FORM_DEFAULTS, CABIN_CLASS_OPTIONS } from "../../constants";
import type { FlightFormSchema } from "../../schemas/flightFormSchema";
import type { City, FlightOffer } from "../../types";
import {
    PageWrapper,
    HeroSection,
    Tagline,
    Title,
    Description,
    SearchCard,
    FormGrid,
    LocationInputs,
    SwapButton,
    DateInputs,
    OtherInputs,
    SelectWrapper,
    SearchButton,
    ResultsSection,
    EmptyStateWrapper,
    EmptyIcon,
    EmptyTitle,
    EmptyDescription,
    ResultsInfo,
    PaginationContainer,
    StyledPagination,
} from "./styled";

const SearchPage = () => {
    const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setSearchParams, queryParams, shouldSearch, hasSearched } = useFlightSearchState();
    const resultsRef = useRef<HTMLDivElement>(null);

    const {
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useFlightFormUrlSync();

    const {
        departure,
        return: returnDateValue,
        type: tripType,
        from: fromValue,
        to: toValue,
        passengers: passengersValue,
        travelClass,
    } = watch();

    useEffect(() => {
        if (tripType === TRIP_TYPES.ONE_WAY && returnDateValue) {
            setValue("return", null, { shouldValidate: false });
        }
    }, [tripType, returnDateValue, setValue]);

    // Fetch flights
    const { data, isLoading, isFetching, isError, refetch } = useFlightSearch(
        shouldSearch ? queryParams : null
    );

    const fetching = isLoading || isFetching;
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

    const onSubmit = (formData: FlightFormSchema) => {
        if (!isValidFormData(formData)) {
            return;
        }
        const searchData = buildSearchFormData(formData);
        const urlParams = buildFlightSearchUrl(searchData);
        setSearchParams(urlParams);
    };

    const handleSwapLocations = () => {
        const from = fromValue;
        const to = toValue;
        setValue("from", to, { shouldDirty: true });
        setValue("to", from, { shouldDirty: true });
    };

    const handleFlightSelect = (flight: FlightOffer) => {
        setSelectedFlight(flight);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFlight(null);
    };

    const handleScrollToFilters = () => {
        if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (!isLoading && !isFetching && sortedFlights.length > 0 && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [isLoading, isFetching, sortedFlights.length]);

    return (
        <PageWrapper>
            {/* Hero Section */}
            <HeroSection>
                <Tagline>Search smarter. Compare faster.</Tagline>
                <Title>Find the best flights with price analytics</Title>
                <Description>
                    Explore routes, compare airlines, and use filters to narrow down the perfect itinerary.
                </Description>

                <AnalyticsCards
                    resultsCount={sortedFlights.length}
                    airlinesCount={airlinesCount}
                    activeFiltersCount={activeFiltersCount}
                    onActiveFiltersClick={handleScrollToFilters}
                />
            </HeroSection>

            {/* Search Form */}
            <SearchCard className="styled-card" onSubmit={handleSubmit(onSubmit)}>
                <Radios
                    control={control}
                    name="type"
                    items={[
                        { label: "Round-trip", value: TRIP_TYPES.ROUND_TRIP },
                        { label: "One-way", value: TRIP_TYPES.ONE_WAY },
                    ]}
                />

                <FormGrid>
                    <LocationInputs>
                        <Input
                            label="From"
                            onSelect={(value) => setValue("from", value, { shouldDirty: true })}
                            value={fromValue as City}
                            error={errors.from?.message?.toString() || ""}
                            placeholder="Where from?"
                        />
                        <SwapButton type="button" onClick={handleSwapLocations}>
                            <ArrowLeftRight size={18} />
                        </SwapButton>
                        <Input
                            label="To"
                            onSelect={(value) => setValue("to", value, { shouldDirty: true })}
                            value={toValue as City}
                            error={errors.to?.message?.toString() || ""}
                            placeholder="Where to?"
                        />
                    </LocationInputs>

                    <DateInputs>
                        <DatePicker
                            control={control}
                            name="departure"
                            label="Departure Date"
                            error={errors.departure?.message || ""}
                            maxDate={returnDateValue ? new Date(returnDateValue) : undefined}
                        />
                        {tripType === TRIP_TYPES.ROUND_TRIP && (
                            <DatePicker
                                control={control}
                                name="return"
                                label="Return Date"
                                minDate={departure ? new Date(departure) : startOfDay(new Date())}
                                error={errors.return?.message || ""}
                            />
                        )}
                    </DateInputs>

                    <OtherInputs>
                        <InputNumber
                            value={passengersValue}
                            onChange={(value) => setValue("passengers", value)}
                            label="Passengers"
                            error={errors.passengers?.message || ""}
                        />
                        <SelectWrapper className="input-wrapper">
                            <label htmlFor="cabin-class-select">Cabin Class</label>
                            <Select
                                id="cabin-class-select"
                                variant="outlined"
                                value={travelClass}
                                defaultValue={travelClass}
                                onChange={(e) => setValue("travelClass", e.target.value as "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST")}
                                fullWidth
                            >
                                {CABIN_CLASS_OPTIONS.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </SelectWrapper>
                    </OtherInputs>
                </FormGrid>

                <SearchButton type="submit" disabled={fetching}>
                    {fetching ? (
                        <>
                            <CircularProgress size={20} color="inherit" thickness={4} />
                            Searching...
                        </>
                    ) : (
                        <>
                            <Search size={18} />
                            Search Flights
                        </>
                    )}
                </SearchButton>
            </SearchCard>

            {/* Results Section */}
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
                                            onChange={(_event, page) => handlePageChange(page)}
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
        </PageWrapper>
    );
};

export default SearchPage;

