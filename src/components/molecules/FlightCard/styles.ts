import { styled } from "@mui/material/styles";

export const Card = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "1.5rem 2rem",
  background: theme.palette.background.paper,
  borderRadius: "12px",
  border: `1px solid ${theme.palette.border.main}`,
  marginBottom: "1rem",
  transition: "all 0.2s ease",
  gap: "2rem",

  "&:hover": {
    borderColor: theme.palette.primary.main,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },

  "@media (max-width: 900px)": {
    flexDirection: "column",
    gap: "1.5rem",
  },
}));

export const CardContent = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const AirlineHeader = styled("h3")(({ theme }) => ({
  fontSize: "0.9rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: 0,
  letterSpacing: "0.02em",
}));

export const LegSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

export const LegLabel = styled("span")(({ theme }) => ({
  fontSize: "0.8rem",
  color: theme.palette.text.secondary,
  fontWeight: 400,
}));

export const FlightTimeline = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  gap: "1rem",
  width: "100%",
});

export const TimeBlock = styled("div")<{ $alignRight?: boolean }>({
  display: "flex",
  flexDirection: "column",
  gap: "0.125rem",
  minWidth: "60px",
  textAlign: "left",
});

export const Time = styled("div")(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.1,
}));

export const Airport = styled("div")(({ theme }) => ({
  fontSize: "0.8rem",
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

export const TimelineCenter = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.25rem",
  paddingTop: "0.5rem",
});

export const DurationText = styled("span")(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.muted,
}));

export const TimelineLine = styled("div")(({ theme }) => ({
  width: "100%",
  height: "2px",
  background: theme.palette.border.main,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

export const TimelineMarker = styled("div")(({ theme }) => ({
  width: 0,
  height: 0,
  borderLeft: `6px solid ${theme.palette.primary.main}`,
  borderTop: "4px solid transparent",
  borderBottom: "4px solid transparent",
  position: "absolute",
  right: 0,
}));

export const FlightDetails = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  flexWrap: "wrap",
});

export const DetailItem = styled("span")(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.muted,
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
}));

export const WarningIcon = styled("span")({
  fontSize: "0.7rem",
  opacity: 0.7,
});

export const FlightSummary = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  flexWrap: "wrap",
});

export const SummaryItem = styled("span")(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.muted,
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
}));

export const ClockIcon = styled("span")({
  fontSize: "0.7rem",
  opacity: 0.7,
});

export const ConnectionInfo = styled("span")(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.muted,
  fontStyle: "italic",
}));

export const PriceSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "0.75rem",
  minWidth: "180px",

  "@media (max-width: 900px)": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  },
});

export const PriceContainer = styled("div")({
  textAlign: "right",

  "@media (max-width: 900px)": {
    textAlign: "left",
  },
});

export const MainPrice = styled("div")(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  lineHeight: 1.2,
}));

export const PricePerAdult = styled("div")(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.muted,
}));

export const SelectButton = styled("button")(({ theme }) => ({
  background: theme.palette.primary.main,
  color: "white",
  border: "none",
  padding: "0.75rem 1.5rem",
  borderRadius: "8px",
  fontSize: "0.875rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease",
  whiteSpace: "nowrap",

  "&:hover": {
    background: theme.palette.primary.dark,
    transform: "translateY(-1px)",
  },

  "&:active": {
    transform: "translateY(0)",
  },
}));

export const TaxNote = styled("span")(({ theme }) => ({
  fontSize: "0.7rem",
  color: theme.palette.text.muted,
  textAlign: "right",

  "@media (max-width: 900px)": {
    display: "none",
  },
}));

