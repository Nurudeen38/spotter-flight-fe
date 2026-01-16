import type { FlightOffer, CarrierDictionary } from "../interfaces";
import { formatDateForUrl } from "./urlUtils";
import type { FlightFormSchema } from "../schemas/flightFormSchema";

/**
 * Extracts the total price from a flight offer
 */
export const getFlightPrice = (flight: FlightOffer): number => {
  return parseFloat(flight.price.total);
};

/**
 * Calculates total duration in minutes for a flight offer across all itineraries
 */
export const getTotalDuration = (flight: FlightOffer): number => {
  return flight.itineraries.reduce((totalMins, itinerary) => {
    const durationMatch = itinerary.duration.match(/PT(\d+)H(\d+)M/);
    if (durationMatch) {
      const hours = parseInt(durationMatch[1]);
      const minutes = parseInt(durationMatch[2]);
      return totalMins + (hours * 60 + minutes);
    }
    return totalMins;
  }, 0);
};

/**
 * Formats duration from total minutes to human-readable format (e.g., "5h 30m")
 */
export const formatDurationFromMinutes = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

/**
 * Calculates total number of stops (connections) across all itineraries in a flight offer.
 * Stops are calculated as connections between segments (segments.length - 1 per itinerary).
 * This represents the number of layovers/connections where passengers change planes.
 */
export const getTotalStops = (flight: FlightOffer): number => {
  return flight.itineraries.reduce((total, itinerary) => {
    // Each itinerary with N segments has N-1 connections (stops)
    return total + Math.max(0, itinerary.segments.length - 1);
  }, 0);
};


/**
 * Gets all connection airports across all itineraries in a flight offer
 */
export const getAllConnectionAirports = (flight: FlightOffer): string[] => {
  const connections: string[] = [];

  flight.itineraries.forEach((itinerary) => {
    if (itinerary.segments.length > 1) {
      itinerary.segments.slice(0, -1).forEach((segment) => {
        const code = segment.arrival.iataCode;
        if (!connections.includes(code)) {
          connections.push(code);
        }
      });
    }
  });

  return connections;
};


/**
 * Extracts the primary airline carrier code from a flight offer
 */
export const getPrimaryAirline = (flight: FlightOffer): string => {
  const firstSegment = flight.itineraries[0]?.segments[0];
  return firstSegment?.carrierCode || "";
};

/**
 * Gets the airline name from carrier code using provided dictionary
 * Falls back to carrier code if not found in dictionary
 */
export const getAirlineName = (
  carrierCode: string,
  carrierDictionary?: CarrierDictionary
): string => {
  if (carrierDictionary && carrierDictionary[carrierCode]) {
    return carrierDictionary[carrierCode];
  }
  return carrierCode;
};

export const buildSearchFormData = (data: FlightFormSchema) => {
  return {
    originIataCode: data.from!.iataCode,
    destinationIataCode: data.to!.iataCode,
    departureDate: formatDateForUrl(data.departure) || "",
    returnDate: data.type === "round-trip" ? formatDateForUrl(data.return) || null : null,
    adults: data.passengers,
    originEntityId: data.from!.iataCode,
    destinationEntityId: data.to!.iataCode,
    originCountryCode: data.from!.address?.countryCode || "",
    destinationCountryCode: data.to!.address?.countryCode || "",
    travelClass: data.travelClass || "ECONOMY",
  };
};

export const isValidFormData = (data: FlightFormSchema): boolean => {
  return !!(data.from?.iataCode && data.to?.iataCode && data.departure);
};

/**
 * Helper function to parse itinerary duration string to minutes
 */
export const parseDurationToMinutes = (duration: string): number => {
  const match = duration.match(/PT(\d+)H(\d+)M/);
  if (match) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    return hours * 60 + minutes;
  }
  // Handle hours only or minutes only format
  const hoursOnly = duration.match(/PT(\d+)H$/);
  if (hoursOnly) {
    return parseInt(hoursOnly[1]) * 60;
  }
  const minutesOnly = duration.match(/PT(\d+)M$/);
  if (minutesOnly) {
    return parseInt(minutesOnly[1]);
  }
  return 0;
};

/**
 * Get aircraft name from code
 */
export const getAircraftName = (code?: string): string => {
  if (!code) return "";
  const aircraftMap: Record<string, string> = {
    "744": "BOEING 747-400",
    "777": "BOEING 777",
    "788": "BOEING 787-8",
    "789": "BOEING 787-9",
    "320": "AIRBUS A320",
    "321": "AIRBUS A321",
    "350": "AIRBUS A350",
    "380": "AIRBUS A380",
  };
  return aircraftMap[code] || `Aircraft ${code}`;
};

