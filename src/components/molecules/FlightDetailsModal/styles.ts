import styled from "styled-components";
import { DialogTitle, DialogActions, Button } from "@mui/material";

// Styled Components
export const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px !important;
  border-bottom: 1px solid var(--border-light);
`;

export const TitleContainer = styled.div`
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

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ScrollableContent = styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const PriceOverview = styled.div`
  background: var(--primary-light);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--primary-light);
`;

export const PriceInfo = styled.div`
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

export const ItinerarySection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const SectionHeader = styled.div`
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

export const SegmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SegmentItem = styled.div`
  display: flex;
  gap: 16px;
`;

export const Timeline = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    flex-shrink: 0;
`;

export const TimeNode = styled.div`
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

export const DetailsColumn = styled.div`
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
            color: var(--text-secondary);
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

export const InfoBadge = styled.span`
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

export const LayoverBanner = styled.div`
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

export const IncludedServices = styled.div`
    background: var(--background);
    padding: 16px;
    border-radius: 12px;
    border: 1px dashed var(--border);
    margin-top: 24px;
`;

export const ServiceTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--success);
    margin-bottom: 12px;
`;

export const ServicesList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const ServiceChip = styled.span`
    font-size: 0.75rem;
    background: var(--success-light);
    color: var(--text);
    padding: 4px 10px;
    border-radius: 12px;
    font-weight: 500;
`;

export const StyledDialogActions = styled(DialogActions)`
    padding: 16px 24px 24px !important;
    border-top: 1px solid var(--border-light);
`;

export const BookButton = styled(Button)`
    background-color: var(--primary) !important;
    padding: 12px !important;
    font-weight: 600 !important;
    border-radius: 8px !important;
    text-transform: none !important;
    font-size: 1rem !important;
`;
