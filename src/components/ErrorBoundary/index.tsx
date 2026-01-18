import { Button } from "@mui/material";
import React, { Component, type ReactNode } from "react";
import { styled } from "@mui/material/styles";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  padding: "2rem",
  textAlign: "center",
});

const ErrorTitle = styled("h2")(({ theme }) => ({
  fontSize: "24px",
  color: theme.palette.text.primary,
  marginBottom: "1rem",
}));

const ErrorMessage = styled("p")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.text.secondary,
  marginBottom: "2rem",
  maxWidth: "600px",
}));

/**
 * Error Boundary component to catch and handle React errors
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            {this.state.error?.message ||
              "An unexpected error occurred. Please try refreshing the page."}
          </ErrorMessage>
          <Button onClick={this.handleReset}>Try Again</Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}


