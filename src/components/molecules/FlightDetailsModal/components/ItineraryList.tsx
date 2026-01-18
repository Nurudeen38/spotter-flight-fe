import { Clock, Info } from "lucide-react";
import type { FlightOffer } from "../../../../types";
import { formatDate, formatDurationFromMinutes, parseDurationToMinutes, formatTime } from "../../../../utils";
import { getAirlineName, getAircraftName } from "../../../../utils/flightUtils";
import {
    ItinerarySection,
    SectionHeader,
    SegmentsList,
    SegmentItem,
    Timeline,
    TimeNode,
    DetailsColumn,
    InfoBadge,
    LayoverBanner,
} from "../styles";

interface ItineraryListProps {
    flightOffer: FlightOffer;
    carrierDictionary?: Record<string, string>;
    aircraftDictionary?: Record<string, string>;
}

export const ItineraryList = ({
    flightOffer,
    carrierDictionary,
    aircraftDictionary,
}: ItineraryListProps) => {
    const getCarrierName = (code: string) => getAirlineName(code, carrierDictionary);
    const getAircraft = (code: string) => getAircraftName(code, aircraftDictionary);

    return (
        <>
            {flightOffer.itineraries.map((itinerary, index) => (
                <ItinerarySection key={index}>
                    <SectionHeader>
                        <div className="leg-label">{index === 0 ? "Outbound" : "Return"}</div>
                        <div className="date-label">
                            {formatDate(itinerary.segments[0].departure.at)}
                        </div>
                        <div className="duration-label">
                            <Clock size={12} />
                            {formatDurationFromMinutes(
                                parseDurationToMinutes(itinerary.duration)
                            )}
                        </div>
                    </SectionHeader>

                    <SegmentsList>
                        {itinerary.segments.map((segment, segIndex) => (
                            <SegmentItem key={segment.id}>
                                <Timeline>
                                    <TimeNode>
                                        <span className="time">{formatTime(segment.departure.at)}</span>
                                        <div className="dot origin" />
                                        <div className="line" />
                                    </TimeNode>
                                    <TimeNode>
                                        <span className="time">{formatTime(segment.arrival.at)}</span>
                                        <div className="dot destination" />
                                    </TimeNode>
                                </Timeline>

                                <DetailsColumn>
                                    <div className="top-row">
                                        <span className="airport-code">
                                            {segment.departure.iataCode}
                                        </span>
                                        <span className="duration">
                                            {formatDurationFromMinutes(
                                                parseDurationToMinutes(segment.duration)
                                            )}
                                        </span>
                                        <span className="airport-code">
                                            {segment.arrival.iataCode}
                                        </span>
                                    </div>

                                    <div className="airline-row">
                                        <InfoBadge>{getCarrierName(segment.carrierCode)}</InfoBadge>
                                        <InfoBadge>{getAircraft(segment.aircraft.code)}</InfoBadge>
                                        <InfoBadge>
                                            {
                                                flightOffer.travelerPricings[0].fareDetailsBySegment.find(
                                                    (f) => f.segmentId === segment.id
                                                )?.cabin
                                            }
                                        </InfoBadge>
                                    </div>

                                    {segIndex < itinerary.segments.length - 1 && (
                                        <LayoverBanner>
                                            <Info size={12} />
                                            {formatDurationFromMinutes(
                                                parseDurationToMinutes(itinerary.duration) -
                                                parseDurationToMinutes(segment.duration) -
                                                parseDurationToMinutes(
                                                    itinerary.segments[segIndex + 1].duration
                                                ) // Rough estimate for display
                                            )}{" "}
                                            layover in {segment.arrival.iataCode}
                                        </LayoverBanner>
                                    )}
                                </DetailsColumn>
                            </SegmentItem>
                        ))}
                    </SegmentsList>
                </ItinerarySection>
            ))}
        </>
    );
};
