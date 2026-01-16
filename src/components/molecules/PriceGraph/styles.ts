import styled from "styled-components";

export const GraphContainer = styled.div`
  background: var(--background-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const HeaderLeft = styled.div`
  flex: 1;
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 575px) {
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
  }
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.01em;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: var(--text);
  opacity: 0.75;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
`;

export const TrendIndicator = styled.div<{ $isUp: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  font-weight: 600;
  color: ${({ $isUp }) => ($isUp ? "#059669" : "#dc2626")};
  padding: 0.25rem 0.75rem;
  background: ${({ $isUp }) => ($isUp ? "rgba(5, 150, 105, 0.1)" : "rgba(220, 38, 38, 0.1)")};
  border-radius: 6px;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const StatItem = styled.div`
  text-align: right;
  padding: 0.5rem 0.75rem;
  background: var(--background);
  border-radius: 8px;
  border: 1px solid var(--border);
`;

export const StatLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  opacity: 0.7;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

export const StatValue = styled.div<{ $variant: "success" | "default" }>`
  font-size: 20px;
  font-weight: 700;
  color: ${({ $variant }) =>
        $variant === "success" ? "#059669" : "var(--text)"};

  @media (max-width: 575px) {
    font-size: 18px;
  }
`;

export const BadgesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const InfoBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text);

  svg {
    color: var(--primary);
    flex-shrink: 0;
  }
`;

export const ChartWrapper = styled.div`
  margin: 0 -0.5rem;
`;

export const DealsFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.875rem 1.25rem;
  background: linear-gradient(
    90deg,
    rgba(5, 150, 105, 0.12) 0%,
    rgba(5, 150, 105, 0.06) 100%
  );
  border: 1px solid rgba(5, 150, 105, 0.2);
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #047857;

  svg {
    color: #059669;
  }

  [data-theme="dark"] & {
    color: #34d399;
    
    svg {
      color: #34d399;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text);
  opacity: 0.7;
  font-size: 15px;
  font-weight: 500;
`;
