import styled from "styled-components";
import { theme } from "../../utils";
import { FORM_DEFAULTS, RESPONSIVE_BREAKPOINTS } from "../../constants";


/**
 * Container for loading states with skeleton placeholders.
 */
export const LoadingSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & .MuiSkeleton-pulse {
    border-radius: ${theme.radiusLg};
  }
`;

/**
 * Empty state message display.
 */
export const EmptyState = styled.div`
  text-align: center;
  font-size: ${theme.fontBase};
  color: ${theme.textSecondary};
  padding: ${theme.space12};
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: ${FORM_DEFAULTS.GAP_LARGE};
  align-items: center;

  @media (max-width: ${RESPONSIVE_BREAKPOINTS.MOBILE}px) {
    flex-direction: column;
    gap: ${FORM_DEFAULTS.GAP_MEDIUM};
  }
`;

export const SwapButton = styled.div`
  width: ${FORM_DEFAULTS.SWAP_SIZE}px;
  height: ${FORM_DEFAULTS.SWAP_SIZE}px;
  background: ${theme.blueLight};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.primary};

  & svg {
    width: ${FORM_DEFAULTS.SWAP_ICON_SIZE}px;
  }
`;

export const FormCard = styled.form`
  max-width: ${FORM_DEFAULTS.MAX_CARD_WIDTH}px;
  margin: ${FORM_DEFAULTS.GAP_SMALL} auto;
  display: flex;
  flex-direction: column;
  gap: ${FORM_DEFAULTS.GAP_SMALL};

  & .radios {
    justify-content: center;
  }

  & > button {
    min-width: ${FORM_DEFAULTS.BUTTON_MIN_WIDTH}px;
    margin: 0 auto;
    min-height: ${FORM_DEFAULTS.BUTTON_MIN_HEIGHT}px;
  }

  @media (max-width: ${RESPONSIVE_BREAKPOINTS.MOBILE}px) {
    & > button {
      min-width: 100%;
      margin-top: ${FORM_DEFAULTS.GAP_SMALL};
    }
  }
`;

export const PageWrapper = styled.div`
  max-width: ${RESPONSIVE_BREAKPOINTS.DESKTOP}px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: ${RESPONSIVE_BREAKPOINTS.TABLET}px) {
    padding: 15px;
  }

  @media (max-width: ${RESPONSIVE_BREAKPOINTS.MOBILE}px) {
    padding: 10px;
  }
`;