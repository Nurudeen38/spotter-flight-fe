import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: var(--background-card);
  border-radius: 12px;
  border: 1px solid var(--border);
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  gap: 2rem;

  &:hover {
    border-color: var(--primary);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AirlineHeader = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  letter-spacing: 0.02em;
`;

export const LegSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const LegLabel = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 400;
`;

export const FlightTimeline = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
`;

export const TimeBlock = styled.div<{ $alignRight?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 60px;
  text-align: ${props => props.$alignRight ? 'left' : 'left'};
`;

export const Time = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.1;
`;

export const Airport = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

export const TimelineCenter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding-top: 0.5rem;
`;

export const DurationText = styled.span`
  font-size: 0.75rem;
  color: var(--text-muted);
`;

export const TimelineLine = styled.div`
  width: 100%;
  height: 2px;
  background: var(--border);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const TimelineMarker = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid var(--primary);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  position: absolute;
  right: 0;
`;

export const FlightDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const DetailItem = styled.span`
  font-size: 0.75rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const WarningIcon = styled.span`
  font-size: 0.7rem;
  opacity: 0.7;
`;

export const FlightSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const SummaryItem = styled.span`
  font-size: 0.75rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const ClockIcon = styled.span`
  font-size: 0.7rem;
  opacity: 0.7;
`;

export const ConnectionInfo = styled.span`
  font-size: 0.75rem;
  color: var(--text-muted);
  font-style: italic;
`;

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  min-width: 180px;

  @media (max-width: 900px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export const PriceContainer = styled.div`
  text-align: right;

  @media (max-width: 900px) {
    text-align: left;
  }
`;

export const MainPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  line-height: 1.2;
`;

export const PricePerAdult = styled.div`
  font-size: 0.75rem;
  color: var(--text-muted);
`;

export const SelectButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TaxNote = styled.span`
  font-size: 0.7rem;
  color: var(--text-muted);
  text-align: right;

  @media (max-width: 900px) {
    display: none;
  }
`;
