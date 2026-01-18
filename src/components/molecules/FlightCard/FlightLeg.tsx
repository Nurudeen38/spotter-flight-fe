import { Clock, AlertTriangle } from "lucide-react";
import type { Itinerary } from "@/types";
import { formatTime, formatDate } from "@/utils/formatUtils";
import { formatDurationFromMinutes, parseDurationToMinutes, getAircraftName } from "@/utils/flightUtils";
import {
    LegSection,
    LegLabel,
    FlightTimeline,
    TimeBlock,
    Time,
    Airport,
    TimelineCenter,
    DurationText,
    TimelineLine,
    TimelineMarker,
    FlightDetails,
    DetailItem,
    WarningIcon,
    FlightSummary,
    SummaryItem,
    ClockIcon,
} from "@/components/molecules/FlightCard/styles";

interface FlightLegProps {
    itinerary: Itinerary;
    label: string;
    carrierName: string;
    cabinClass: string;
    aircraftDictionary?: Record<string, string>;
}

export const FlightLeg = ({ itinerary, label, carrierName, cabinClass, aircraftDictionary }: FlightLegProps) => {
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    const duration = parseDurationToMinutes(itinerary.duration);

    return (
        <LegSection>
            <LegLabel>
                {label} • {formatDate(firstSegment.departure.at)}
            </LegLabel>

            <FlightTimeline>
                <TimeBlock>
                    <Time>{formatTime(firstSegment.departure.at)}</Time>
                    <Airport>{firstSegment.departure.iataCode}</Airport>
                </TimeBlock>

                <TimelineCenter>
                    <DurationText>{formatDurationFromMinutes(duration)}</DurationText>
                    <TimelineLine>
                        <TimelineMarker />
                    </TimelineLine>
                </TimelineCenter>

                <TimeBlock $alignRight>
                    <Time>{formatTime(lastSegment.arrival.at)}</Time>
                    <Airport>{lastSegment.arrival.iataCode}</Airport>
                </TimeBlock>
            </FlightTimeline>

            <FlightDetails>
                <DetailItem>
                    <WarningIcon><AlertTriangle size={12} /></WarningIcon>
                    {carrierName}
                </DetailItem>
                <DetailItem>Flight {firstSegment.number}</DetailItem>
                <DetailItem>{getAircraftName(firstSegment.aircraft?.code, aircraftDictionary)}</DetailItem>
            </FlightDetails>

            <FlightSummary>
                <SummaryItem>
                    <ClockIcon><Clock size={12} /></ClockIcon>
                    Total: {formatDurationFromMinutes(duration)}
                </SummaryItem>
                <SummaryItem>
                    {itinerary.segments.length === 1
                        ? "Direct"
                        : `${itinerary.segments.length - 1} stop${itinerary.segments.length - 1 > 1 ? "s" : ""}`}
                </SummaryItem>
                <SummaryItem>{cabinClass}</SummaryItem>
            </FlightSummary>
        </LegSection>
    );
};
