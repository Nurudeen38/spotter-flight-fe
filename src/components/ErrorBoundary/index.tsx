import { Button } from "@mui/material";
import React, { Component, type ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  font-size: 24px;
  color: #111827;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 600px;
`;

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

