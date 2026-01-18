import { styled } from "@mui/material/styles";
import { AlertTriangle, RefreshCw } from "lucide-react";

const ErrorWrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: `${theme.customSpacing.space16} ${theme.customSpacing.space8}`,
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.error.main}`,
  borderRadius: theme.borderRadius.xl,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.customSpacing.space4,
}));

const ErrorIcon = styled("div")(({ theme }) => ({
  width: "64px",
  height: "64px",
  background: "rgba(239, 68, 68, 0.1)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.error.main,
}));

const ErrorTitle = styled("h3")(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: 0,
}));

const ErrorMessage = styled("p")(({ theme }) => ({
  color: theme.palette.text.secondary,
  maxWidth: "400px",
  margin: 0,
  fontSize: "0.875rem",
}));

const RetryButton = styled("button")(({ theme }) => ({
  marginTop: theme.customSpacing.space4,
  display: "flex",
  alignItems: "center",
  gap: theme.customSpacing.space2,
  padding: `${theme.customSpacing.space2} ${theme.customSpacing.space4}`,
  background: theme.palette.primary.main,
  color: "white",
  border: "none",
  borderRadius: theme.borderRadius.md,
  cursor: "pointer",
  fontWeight: 500,
  transition: theme.customTransitions.base,
  fontSize: "0.875rem",

  "&:hover": {
    background: theme.palette.primary.dark,
    transform: "translateY(-1px)",
    boxShadow: theme.customShadows.sm,
  },

  "&:active": {
    transform: "translateY(0)",
  },
}));

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

