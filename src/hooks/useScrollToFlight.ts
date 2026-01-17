import { useCallback } from "react";
import { FORM_DEFAULTS } from "../constants";
import type { FlightOffer } from "../types";

interface UseScrollToFlightProps {
    sortedFlights: FlightOffer[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const useScrollToFlight = ({
    sortedFlights,
    currentPage,
    totalPages,
    onPageChange,
}: UseScrollToFlightProps) => {
    const scrollToFlightCard = useCallback((flightId: string) => {
        const element = document.getElementById(`flight-card-${flightId}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.style.transition = "box-shadow 0.3s ease";
            element.style.boxShadow = "0 0 0 3px rgba(15, 181, 174, 0.3)";
            setTimeout(() => {
                element.style.boxShadow = "";
            }, 2000);
        }
    }, []);

    const handleFlightClick = useCallback(
        (flightId: string) => {
            const flightIndex = sortedFlights.findIndex((f) => f.id === flightId);
            if (flightIndex === -1) return;

            const targetPage = Math.floor(flightIndex / FORM_DEFAULTS.ITEMS_PER_PAGE) + 1;

            if (targetPage !== currentPage && targetPage <= totalPages) {
                onPageChange(targetPage);
                setTimeout(() => scrollToFlightCard(flightId), 100);
            } else {
                scrollToFlightCard(flightId);
            }
        },
        [sortedFlights, currentPage, totalPages, onPageChange, scrollToFlightCard]
    );

    return { handleFlightClick };
};
