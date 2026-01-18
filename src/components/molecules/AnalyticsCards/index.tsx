import { styled } from "@mui/material/styles";
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

const CardsContainer = styled("div")({
    display: "flex",
    gap: "1rem",

    "@media (max-width: 575px)": {
        flexWrap: "wrap",
    },
});

const Card = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.border.light}`,
    borderRadius: "10px",
    minWidth: "100px",
}));

const CardIcon = styled("div")(({ theme }) => ({
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: theme.palette.primary.light,
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const CardContent = styled("div")({
    display: "flex",
    flexDirection: "column",
});

const CardValue = styled("span")(({ theme }) => ({
    fontSize: "18px",
    fontWeight: 600,
    color: theme.palette.text.primary,
    lineHeight: 1.2,
}));

const CardLabel = styled("span")(({ theme }) => ({
    fontSize: "12px",
    color: theme.palette.text.muted,
    fontWeight: 500,
}));

