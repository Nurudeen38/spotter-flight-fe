import { useFlightSearchContext } from "../../../context/FlightSearchContext";
import { AnalyticsCards } from "../../molecules/AnalyticsCards";
import { HeroSection, Tagline, Title, Description } from "../../../pages/SearchPage/styled";

export const SearchHero = () => {
    const { stats, resultsRef } = useFlightSearchContext();

    const handleScrollToFilters = () => {
        if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <HeroSection>
            <Tagline>Search smarter. Compare faster.</Tagline>
            <Title>Find the best flights with price analytics</Title>
            <Description>
                Explore routes, compare airlines, and use filters to narrow down the perfect itinerary.
            </Description>

            <AnalyticsCards
                resultsCount={stats.resultsCount}
                airlinesCount={stats.airlinesCount}
                activeFiltersCount={stats.activeFiltersCount}
                onActiveFiltersClick={handleScrollToFilters}
            />
        </HeroSection>
    );
};
