import styled from "styled-components";
import { theme } from "../../utils";

/**
 * SearchPage Styled Components
 * 
 */

// ============================================================================
// Layout Components
// ============================================================================

export const PageWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.space8};

  @media (max-width: 768px) {
    padding: ${theme.space4};
  }
`;

export const HeroSection = styled.section`
  margin-bottom: ${theme.space8};
`;

export const ResultsSection = styled.section``;

// ============================================================================
// Hero Typography
// ============================================================================

export const Tagline = styled.p`
  font-size: ${theme.fontSm};
  font-weight: ${theme.fontMedium};
  color: ${theme.textMuted};
  margin-bottom: ${theme.space2};
`;

export const Title = styled.h1`
  font-size: ${theme.font3xl};
  font-weight: ${theme.fontBold};
  color: ${theme.text};
  margin-bottom: ${theme.space2};
  line-height: 1.2;

  @media (max-width: 575px) {
    font-size: ${theme.fontXl};
  }
`;

export const Description = styled.p`
  font-size: ${theme.fontBase};
  color: ${theme.textSecondary};
  margin-bottom: ${theme.space6};
  max-width: 600px;
`;

// ============================================================================
// Search Form Components
// ============================================================================

export const SearchCard = styled.form`
  margin-bottom: ${theme.space8};
  
  & .radios {
    margin-bottom: ${theme.space4};
  }
`;

export const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space4};
`;

export const LocationInputs = styled.div`
  display: flex;
  gap: ${theme.space4};
  align-items: flex-end;

  & > .input-wrapper {
    flex: 1;
  }

  @media (max-width: 575px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SwapButton = styled.button`
  width: 40px;
  height: 40px;
  min-width: 40px;
  background: ${theme.primaryLight};
  border: none;
  border-radius: ${theme.radiusFull};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.primary};
  cursor: pointer;
  transition: all ${theme.transitionBase};
  margin-bottom: 4px;

  &:hover {
    background: ${theme.primary};
    color: white;
    transform: rotate(180deg);
  }

  @media (max-width: 575px) {
    align-self: center;
    margin: 0;
  }
`;

export const DateInputs = styled.div`
  display: flex;
  gap: ${theme.space4};


  & > * {
    flex: 1;
  }

  
  & > * > div {
    flex: 1;
      border-radius: ${theme.radiusLg};
  }

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

export const OtherInputs = styled.div`
  display: flex;
  gap: ${theme.space4};

  & > * {
    flex: 1;
  }

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & label {
    color: ${theme.textSecondary};
    text-transform: uppercase;
    font-size: ${theme.fontSm};
    font-weight: ${theme.fontMedium};
    margin-bottom: ${theme.space2};
  }

  & .MuiOutlinedInput-root {
    border-radius: ${theme.radiusLg};
    background: ${theme.inputBackground};

    &:hover {
      & .MuiOutlinedInput-notchedOutline {
        border-color: ${theme.borderFocus};
      }
    }
  }

  & .MuiSelect-select {
    padding: 10px 16px;
  }

  & fieldset {
    border: 2px solid ${theme.border};
  }
`;

export const SearchButton = styled.button`
  width: 100%;
  margin: ${theme.space6} auto 0;
  padding: 0.875rem ${theme.space6};
  background: ${theme.primary};
  color: #134e4a;
  border: none;
  border-radius: ${theme.radiusLg};
  font-size: ${theme.fontBase};
  font-weight: ${theme.fontSemibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.space2};
  transition: all ${theme.transitionBase};

  &:hover {
    background: ${theme.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(15, 181, 174, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 575px) {
    max-width: 100%;
  }
`;

export const EmptyStateWrapper = styled.div`
  text-align: center;
  padding: ${theme.space16} ${theme.space8};
  background: ${theme.backgroundCard};
  border: 1px solid ${theme.borderLight};
  border-radius: ${theme.radiusXl};
`;

export const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${theme.space6};
  background: ${theme.primaryLight};
  border-radius: ${theme.radiusFull};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.primary};
`;

export const EmptyTitle = styled.h2`
  font-size: ${theme.fontXl};
  font-weight: ${theme.fontSemibold};
  color: ${theme.text};
  margin-bottom: ${theme.space2};
`;

export const EmptyDescription = styled.p`
  font-size: ${theme.fontBase};
  color: ${theme.textSecondary};
  max-width: 400px;
  margin: 0 auto;
`;

export const ResultsInfo = styled.div`
  font-size: ${theme.fontBase};
  color: ${theme.textSecondary};
  margin-bottom: ${theme.space4};
  font-weight: ${theme.fontMedium};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.space8};
  margin-bottom: ${theme.space8};
  padding: ${theme.space4};
`;

import { Pagination } from "@mui/material";

export const StyledPagination = styled(Pagination)`
  & .MuiPaginationItem-root {
    color: ${theme.text};
    border-color: ${theme.border};
    border-radius: ${theme.radiusLg};
    font-family: inherit;
    font-weight: ${theme.fontMedium};
    transition: all ${theme.transitionBase};
    
    &:hover {
      background-color: ${theme.backgroundCard};
      border-color: ${theme.primary};
      color: ${theme.primary};
    }
    
    &.Mui-selected {
      background-color: ${theme.primary} !important;
      color: white;
      border-color: ${theme.primary};
      
      &:hover {
        background-color: ${theme.primaryHover} !important;
      }
    }

    &.MuiPaginationItem-ellipsis {
      color: ${theme.textSecondary};
    }
  }
`;
