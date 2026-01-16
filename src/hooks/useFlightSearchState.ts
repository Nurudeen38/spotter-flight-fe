import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { parseSearchParams } from "../utils/urlUtils";

export const useFlightSearchState = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [hasSearched, setHasSearched] = useState(false);

    // Parse URL params for flight search
    const queryParams = useMemo(
        () => parseSearchParams(searchParams),
        [searchParams]
    );

    // Determine if we should fetch flights (only if URL has search params)
    const shouldSearch = useMemo(() => {
        return Boolean(
            queryParams?.originIataCode &&
            queryParams?.destinationIataCode &&
            queryParams?.date
        );
    }, [queryParams]);

    // Track if search has been performed
    useEffect(() => {
        if (shouldSearch) {
            setHasSearched(true);
        }
    }, [shouldSearch]);

    return {
        searchParams,
        setSearchParams,
        queryParams,
        shouldSearch,
        hasSearched,
    };
};
