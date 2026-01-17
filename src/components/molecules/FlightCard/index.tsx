import type { FlightOffer } from "../../../interfaces";
import { formatCurrency } from "../../../utils/formatUtils";
import { getAirlineName, getAllConnectionAirports } from "../../../utils/flightUtils";
import { FlightLeg } from "./FlightLeg";
import {
  Card,
  CardContent,
  AirlineHeader,
  ConnectionInfo,
  PriceSection,
  PriceContainer,
  MainPrice,
  PricePerAdult,
  SelectButton,
  TaxNote
} from "./styles";

interface FlightCardProps {
  flightOffer: FlightOffer;
  carrierDictionary?: Record<string, string>;
  aircraftDictionary?: Record<string, string>;
  id?: string;
  onSelect?: (offer: FlightOffer) => void;
}

const FlightCard = ({ flightOffer, carrierDictionary, id, onSelect, aircraftDictionary }: FlightCardProps) => {
  const isRoundTrip = flightOffer.itineraries.length > 1;

  // Outbound leg
  const outboundItinerary = flightOffer.itineraries[0];
  const outboundFirstSegment = outboundItinerary.segments[0];

  // Return leg (if round trip)
  const returnItinerary = isRoundTrip ? flightOffer.itineraries[1] : null; // Accessing by index for round-trip return

  const connectionAirports = getAllConnectionAirports(flightOffer);

  // Get carrier name
  const carrierCode = outboundFirstSegment.carrierCode;
  const carrierName = getAirlineName(carrierCode, carrierDictionary);

  // Get cabin class
  const cabinClass = flightOffer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || "ECONOMY";

  // Calculate per adult price
  const totalPrice = parseFloat(flightOffer.price.total);
  const adults = flightOffer.travelerPricings?.length || 1;
  const pricePerAdult = totalPrice / adults;

  return (
    <Card id={id}>
      <CardContent>
        {/* Header with airline name */}
        <AirlineHeader>{carrierName}</AirlineHeader>

        {/* Outbound Flight */}
        <FlightLeg
          itinerary={outboundItinerary}
          label="Outbound"
          carrierName={carrierName}
          cabinClass={cabinClass}
          aircraftDictionary={aircraftDictionary}
        />

        {/* Return Flight */}
        {isRoundTrip && returnItinerary && (
          <FlightLeg
            itinerary={returnItinerary}
            label="Return"
            carrierName={getAirlineName(returnItinerary.segments[0].carrierCode, carrierDictionary)}
            cabinClass={cabinClass}
            aircraftDictionary={aircraftDictionary}
          />
        )}

        {connectionAirports.length > 0 && (
          <ConnectionInfo>via {connectionAirports.join(", ")}</ConnectionInfo>
        )}
      </CardContent>

      <PriceSection>
        <PriceContainer>
          <MainPrice>
            {formatCurrency(flightOffer.price.total, flightOffer.price.currency)}
          </MainPrice>
          <PricePerAdult>
            {formatCurrency(pricePerAdult.toString(), flightOffer.price.currency)} per adult
          </PricePerAdult>
        </PriceContainer>
        <SelectButton onClick={() => onSelect?.(flightOffer)}>
          Select Flight
        </SelectButton>
        <TaxNote>Includes taxes and fees</TaxNote>
      </PriceSection>
    </Card>
  );
};

export { FlightCard };
