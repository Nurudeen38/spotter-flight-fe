import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseISO, isValid } from "date-fns";
import type { City } from "@/types";
import { useCitySearch } from "@/hooks/useCitySearch";
import {
  extractFlightSearchParams,
  createMinimalCity,
} from "@/utils/urlUtils";
import {
  flightFormSchema,
  type FlightFormSchema,
  type CabinClass,
} from "@/schemas/flightFormSchema";
import {
  DEFAULT_TRIP_TYPE,
  DEFAULT_PASSENGERS,
  DEFAULT_CABIN_CLASS,
  CABIN_CLASS,
} from "@/constants/flightConstants";

/**
 * Custom hook for syncing flight form with URL parameters
 */
export const useFlightFormUrlSync = () => {
  const [searchParams] = useSearchParams();
  const urlParams = useMemo(
    () => extractFlightSearchParams(searchParams),
    [searchParams]
  );

  const form = useForm<FlightFormSchema>({
    resolver: zodResolver(flightFormSchema),
    defaultValues: {
      type: DEFAULT_TRIP_TYPE,
      from: null,
      to: null,
      passengers: DEFAULT_PASSENGERS,
      travelClass: DEFAULT_CABIN_CLASS,
    },
  });

  // Search for cities by iataCode to get full city objects
  const { data: originCities } = useCitySearch(urlParams.originIataCode || "");
  const { data: destinationCities } = useCitySearch(
    urlParams.destinationIataCode || ""
  );

  // Find matching city from search results, or create minimal city object
  const originCity = useMemo((): City | null => {
    if (!urlParams.originIataCode) return null;
    if (originCities?.data) {
      const found = (originCities.data as City[]).find(
        (city) => city.iataCode === urlParams.originIataCode
      );
      if (found) return found;
    }
    return createMinimalCity(
      urlParams.originIataCode,
      urlParams.originCountryCode
    );
  }, [urlParams.originIataCode, urlParams.originCountryCode, originCities]);

  const destinationCity = useMemo((): City | null => {
    if (!urlParams.destinationIataCode) return null;
    if (destinationCities?.data) {
      const found = (destinationCities.data as City[]).find(
        (city) => city.iataCode === urlParams.destinationIataCode
      );
      if (found) return found;
    }
    return createMinimalCity(
      urlParams.destinationIataCode,
      urlParams.destinationCountryCode
    );
  }, [
    urlParams.destinationIataCode,
    urlParams.destinationCountryCode,
    destinationCities,
  ]);

  // Prefill form from URL params
  useEffect(() => {
    const hasUrlParams =
      urlParams.originIataCode ||
      urlParams.destinationIataCode ||
      urlParams.departureDate ||
      urlParams.returnDate ||
      urlParams.adults;

    if (!hasUrlParams) return;

    // Set trip type based on return date presence
    if (urlParams.returnDate) {
      form.setValue("type", "round-trip", { shouldValidate: false });
    } else if (urlParams.departureDate) {
      form.setValue("type", "one-way", { shouldValidate: false });
    }

    // Set cities when available
    if (originCity) {
      form.setValue("from", originCity, { shouldValidate: false });
    }
    if (destinationCity) {
      form.setValue("to", destinationCity, { shouldValidate: false });
    }

    // Set departure date
    if (urlParams.departureDate) {
      const depDate = parseISO(urlParams.departureDate);
      if (isValid(depDate)) {
        form.setValue("departure", depDate, { shouldValidate: false });
      }
    }

    // Set return date
    if (urlParams.returnDate) {
      const retDate = parseISO(urlParams.returnDate);
      if (isValid(retDate)) {
        form.setValue("return", retDate, { shouldValidate: false });
      }
    }

    if (urlParams.adults) {
      const adultsNum = parseInt(urlParams.adults, 10);
      if (!isNaN(adultsNum) && adultsNum > 0) {
        form.setValue("passengers", adultsNum, { shouldValidate: false });
      }
    }

    // Set travel class
    if (urlParams.travelClass) {
      if (Object.values(CABIN_CLASS).includes(urlParams.travelClass as any)) {
        form.setValue("travelClass", urlParams.travelClass as CabinClass, {
          shouldValidate: false,
        });
      }
    }
  }, [
    originCity,
    destinationCity,
    urlParams.departureDate,
    urlParams.returnDate,
    urlParams.adults,
    urlParams.originIataCode,
    urlParams.destinationIataCode,
    urlParams.travelClass,
    form,
  ]);

  return form;
};
