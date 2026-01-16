import styled from "styled-components";
import { theme } from "../../utils";

/**
 * Shared styled components for consistent UI across the application.
 * 
 * These components use CSS variables via the theme util for proper
 * dark mode support and design consistency.
 */



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


