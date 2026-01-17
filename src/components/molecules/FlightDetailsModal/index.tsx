import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from "@mui/material";
import { X, Plane, Clock, Info, CheckCircle2 } from "lucide-react";
import styled from "styled-components";
import type { FlightOffer } from "../../../types";
import { formatCurrency, formatTime, formatDate } from "../../../utils/formatUtils";
import {
    getAirlineName,
    formatDurationFromMinutes,
    parseDurationToMinutes,
    getAircraftName,
} from "../../../utils/flightUtils";
import { ButtonWrapper as Button } from "../../atoms/Button";

interface FlightDetailsModalProps {
    open: boolean;
    onClose: () => void;
    flightOffer: FlightOffer | null;
    carrierDictionary?: Record<string, string>;
    aircraftDictionary?: Record<string, string>;
}

export const FlightDetailsModal = ({
    open,
    onClose,
    flightOffer,
    carrierDictionary,
    aircraftDictionary,
}: FlightDetailsModalProps) => {
    if (!flightOffer) return null;

    const getCarrierName = (code: string) => getAirlineName(code, carrierDictionary);
    const getAircraft = (code: string) => getAircraftName(code, aircraftDictionary);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: {
                    borderRadius: "16px",
                    padding: "0",
                    background: "var(--background-card)",
                    boxShadow: "var(--shadow-lg)",
                    minHeight: "80vh",
                },
            }}
        >
            <StyledDialogTitle>
                <TitleContainer>
                    <Plane size={24} className="icon" />
                    <span>Flight Details</span>
                </TitleContainer>
                <IconButton onClick={onClose} size="small">
                    <X size={20} />
                </IconButton>
            </StyledDialogTitle>

            <DialogContent sx={{ p: '0 !important' }}>
                <ModalContent>
                    <PriceOverview>
                        <PriceInfo>
                            <span className="label">Total Price</span>
                            <span className="value">
                                {formatCurrency(flightOffer.price.total, flightOffer.price.currency)}
                            </span>
                            <span className="sub">
                                for {flightOffer.travelerPricings.length} traveler{flightOffer.travelerPricings.length > 1 ? 's' : ''}
                            </span>
                        </PriceInfo>
                    </PriceOverview>

                    <ScrollableContent>
                        {flightOffer.itineraries.map((itinerary, index) => (
                            <ItinerarySection key={index}>
                                <SectionHeader>
                                    <div className="leg-label">
                                        {index === 0 ? "Outbound" : "Return"}
                                    </div>
                                    <div className="date-label">
                                        {formatDate(itinerary.segments[0].departure.at)}
                                    </div>
                                    <div className="duration-label">
                                        <Clock size={12} />
                                        {formatDurationFromMinutes(parseDurationToMinutes(itinerary.duration))}
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
                                                    <span className="airport-code">{segment.departure.iataCode}</span>
                                                    <span className="duration">
                                                        {formatDurationFromMinutes(
                                                            parseDurationToMinutes(segment.duration)
                                                        )}
                                                    </span>
                                                    <span className="airport-code">{segment.arrival.iataCode}</span>
                                                </div>

                                                <div className="airline-row">
                                                    <InfoBadge>{getCarrierName(segment.carrierCode)}</InfoBadge>
                                                    <InfoBadge>{getAircraft(segment.aircraft.code)}</InfoBadge>
                                                    <InfoBadge>
                                                        {flightOffer.travelerPricings[0].fareDetailsBySegment.find(f => f.segmentId === segment.id)?.cabin}
                                                    </InfoBadge>
                                                </div>

                                                {segIndex < itinerary.segments.length - 1 && (
                                                    <LayoverBanner>
                                                        <Info size={12} />
                                                        {formatDurationFromMinutes(
                                                            parseDurationToMinutes(itinerary.duration) -
                                                            parseDurationToMinutes(segment.duration) -
                                                            parseDurationToMinutes(itinerary.segments[segIndex + 1].duration) // Rough estimate for display
                                                        )} layover in {segment.arrival.iataCode}
                                                    </LayoverBanner>
                                                )}
                                            </DetailsColumn>
                                        </SegmentItem>
                                    ))}
                                </SegmentsList>
                            </ItinerarySection>
                        ))}

                        <IncludedServices>
                            <ServiceTitle><CheckCircle2 size={16} /> Included</ServiceTitle>
                            <ServicesList>
                                {flightOffer.pricingOptions.includedCheckedBagsOnly && (
                                    <ServiceChip>Checked Bags</ServiceChip>
                                )}
                                <ServiceChip>Cabin Bag</ServiceChip>
                                <ServiceChip>Seat Selection</ServiceChip>
                            </ServicesList>
                        </IncludedServices>
                    </ScrollableContent>

                </ModalContent>
            </DialogContent>

            <StyledDialogActions>
                <BookButton variant="contained" fullWidth disableElevation onClick={onClose}>
                    Select This Flight
                </BookButton>
            </StyledDialogActions>
        </Dialog>
    );
};

// Styled Components
const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px !important;
  border-bottom: 1px solid var(--border-light);
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    
    & .icon {
        color: var(--primary);
    }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScrollableContent = styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const PriceOverview = styled.div`
  background: var(--primary-light);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--primary-light);
`;

const PriceInfo = styled.div`
    display: flex;
    flex-direction: column;
    
    & .label {
        font-size: 0.75rem;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 0.5px;
        color: var(--primary);
        margin-bottom: 2px;
    }
    
    & .value {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--primary);
        line-height: 1.1;
    }
    
    & .sub {
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-top: 2px;
    }
`;

const ItinerarySection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-light);
    
    & .leg-label {
        font-weight: 700;
        color: var(--text);
        font-size: 0.95rem;
    }
    
    & .date-label {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    & .duration-label {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--text-muted);
        font-size: 0.8rem;
        background: var(--background);
        padding: 2px 8px;
        border-radius: 12px;
    }
`;

const SegmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SegmentItem = styled.div`
  display: flex;
  gap: 16px;
`;

const Timeline = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    flex-shrink: 0;
`;

const TimeNode = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    position: relative;
    height: 38px; /* Fixed height for alignment */
    
    &:last-child {
        height: auto;
    }

    & .time {
        font-weight: 700;
        font-size: 0.9rem;
        color: var(--text);
        position: absolute;
        right: 20px;
        top: -4px;
    }
    
    & .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid var(--primary);
        background: var(--primary);
        position: absolute;
        right: 0;
        top: 2px;
        z-index: 2;
        
        &.destination {
            background: white;
        }
    }
    
    & .line {
        position: absolute;
        right: 4px; /* Centered with dot */
        top: 12px;
        background: var(--border);
        width: 2px;
        height: 130%; /* Extend to next node */
        z-index: 1;
    }
`;

const DetailsColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 0;

    & .top-row {
        display: flex;
        align-items: baseline;
        gap: 12px;
        
        & .airport-code {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
            line-height: 1;
        }
        
        & .duration {
            font-size: 0.9rem;
            color: var(--text-secondary);
            font-weight: 500;
        }
    }

    & .airline-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
    }
`;

const InfoBadge = styled.span`
    font-size: 0.75rem;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 8px;
    background: var(--chip-bg);
    color: var(--chip-text);
    border: 1px solid var(--chip-border);
    font-weight: 700;
    letter-spacing: 0.5px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
`;

const LayoverBanner = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: var(--warning);
    background: var(--warning-light);
    padding: 6px 10px;
    border-radius: 6px;
    margin-top: 24px;
    margin-bottom: 8px;
    font-weight: 500;
`;

const IncludedServices = styled.div`
    background: var(--background);
    padding: 16px;
    border-radius: 12px;
    border: 1px dashed var(--border);
    margin-top: 24px;
`;

const ServiceTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--success);
    margin-bottom: 12px;
`;

const ServicesList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const ServiceChip = styled.span`
    font-size: 0.75rem;
    background: var(--success-light);
    color: var(--text);
    padding: 4px 10px;
    border-radius: 12px;
    font-weight: 500;
`;

const StyledDialogActions = styled(DialogActions)`
    padding: 16px 24px 24px !important;
    border-top: 1px solid var(--border-light);
`;

const BookButton = styled(Button)`
    background-color: var(--primary) !important;
    padding: 12px !important;
    font-weight: 600 !important;
    border-radius: 8px !important;
    text-transform: none !important;
    font-size: 1rem !important;
`;
