import styled from "styled-components";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { theme } from "../../utils";

const ErrorWrapper = styled.div`
  text-align: center;
  padding: ${theme.space16} ${theme.space8};
  background: ${theme.backgroundCard};
  border: 1px solid ${theme.error};
  border-radius: ${theme.radiusXl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.space4};
`;

const ErrorIcon = styled.div`
  width: 64px;
  height: 64px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.error};
`;

const ErrorTitle = styled.h3`
  font-size: ${theme.fontLg};
  font-weight: ${theme.fontSemibold};
  color: ${theme.text};
  margin: 0;
`;

const ErrorMessage = styled.p`
  color: ${theme.textSecondary};
  max-width: 400px;
  margin: 0;
  font-size: ${theme.fontBase};
`;

const RetryButton = styled.button`
  margin-top: ${theme.space4};
  display: flex;
  align-items: center;
  gap: ${theme.space2};
  padding: ${theme.space2} ${theme.space4};
  background: ${theme.primary};
  color: white;
  border: none;
  border-radius: ${theme.radiusMd};
  cursor: pointer;
  font-weight: ${theme.fontMedium};
  transition: all ${theme.transitionBase};
  font-size: ${theme.fontBase};

  &:hover {
    background: ${theme.primaryHover};
    transform: translateY(-1px);
    box-shadow: ${theme.shadowSm};
  }

  &:active {
    transform: translateY(0);
  }
`;

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export const ErrorState = ({
    title = "Something went wrong",
    message = "We couldn't fetch the flight results. Please try again.",
    onRetry
}: ErrorStateProps) => {
    return (
        <ErrorWrapper>
            <ErrorIcon>
                <AlertTriangle size={32} />
            </ErrorIcon>
            <ErrorTitle>{title}</ErrorTitle>
            <ErrorMessage>{message}</ErrorMessage>
            {onRetry && (
                <RetryButton onClick={onRetry}>
                    <RefreshCw size={16} />
                    Try Again
                </RetryButton>
            )}
        </ErrorWrapper>
    );
};
