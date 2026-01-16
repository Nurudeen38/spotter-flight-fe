import styled from "styled-components";
import { Plane, Filter, Building2 } from "lucide-react";

interface AnalyticsCardsProps {
    resultsCount: number;
    airlinesCount: number;
    activeFiltersCount: number;
    onActiveFiltersClick?: () => void;
}

const AnalyticsCards = ({
    resultsCount,
    airlinesCount,
    activeFiltersCount,
    onActiveFiltersClick
}: AnalyticsCardsProps) => {
    return (
        <CardsContainer>
            <Card>
                <CardIcon>
                    <Plane size={16} />
                </CardIcon>
                <CardContent>
                    <CardValue>{resultsCount}</CardValue>
                    <CardLabel>Results</CardLabel>
                </CardContent>
            </Card>

            <Card>
                <CardIcon>
                    <Building2 size={16} />
                </CardIcon>
                <CardContent>
                    <CardValue>{airlinesCount}</CardValue>
                    <CardLabel>Airlines</CardLabel>
                </CardContent>
            </Card>

            <Card
                onClick={onActiveFiltersClick}
                style={{ cursor: onActiveFiltersClick ? 'pointer' : 'default' }}
            >
                <CardIcon>
                    <Filter size={16} />
                </CardIcon>
                <CardContent>
                    <CardValue>{activeFiltersCount}</CardValue>
                    <CardLabel>Active filters</CardLabel>
                </CardContent>
            </Card>
        </CardsContainer>
    );
};

export { AnalyticsCards };

const CardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 575px) {
    flex-wrap: wrap;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--background-card);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  min-width: 100px;
`;

const CardIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.2;
`;

const CardLabel = styled.span`
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
`;
