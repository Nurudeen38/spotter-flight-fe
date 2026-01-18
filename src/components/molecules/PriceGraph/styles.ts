import { styled } from "@mui/material/styles";

export const GraphContainer = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: "12px",
  padding: "1.5rem",
  marginBottom: "1.5rem",

  "@media (max-width: 768px)": {
    padding: "1rem",
  },
}));

export const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexWrap: "wrap",
  gap: "1rem",
  marginBottom: "1rem",
});

export const HeaderLeft = styled("div")({
  flex: 1,
});

export const HeaderRight = styled("div")({
  display: "flex",
  gap: "2rem",

  "@media (max-width: 575px)": {
    gap: "1rem",
    width: "100%",
    justifyContent: "space-between",
  },
});

export const Title = styled("h3")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 700,
  color: theme.palette.text.primary,
  margin: "0 0 0.25rem 0",
  letterSpacing: "-0.01em",
}));

export const Subtitle = styled("p")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.text.primary,
  opacity: 0.75,
  margin: "0 0 0.5rem 0",
  lineHeight: 1.4,
}));

export const TrendIndicator = styled("div")<{ $isUp: boolean }>(({ $isUp }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "14px",
  fontWeight: 600,
  color: $isUp ? "#059669" : "#dc2626",
  padding: "0.25rem 0.75rem",
  background: $isUp ? "rgba(5, 150, 105, 0.1)" : "rgba(220, 38, 38, 0.1)",
  borderRadius: "6px",

  "& svg": {
    width: "18px",
    height: "18px",
  },
}));

export const StatItem = styled("div")(({ theme }) => ({
  textAlign: "right",
  padding: "0.5rem 0.75rem",
  background: theme.palette.background.default,
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`,
}));

export const StatLabel = styled("div")(({ theme }) => ({
  fontSize: "13px",
  fontWeight: 500,
  color: theme.palette.text.primary,
  opacity: 0.7,
  marginBottom: "0.25rem",
  textTransform: "uppercase",
  letterSpacing: "0.03em",
}));

export const StatValue = styled("div")<{ $variant: "success" | "default" }>(({ theme, $variant }) => ({
  fontSize: "20px",
  fontWeight: 700,
  color: $variant === "success" ? "#059669" : theme.palette.text.primary,

  "@media (max-width: 575px)": {
    fontSize: "18px",
  },
}));

export const BadgesRow = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginBottom: "1rem",
});

export const InfoBadge = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem 1rem",
  background: theme.palette.background.default,
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: 500,
  color: theme.palette.text.primary,

  "& svg": {
    color: theme.palette.primary.main,
    flexShrink: 0,
  },
}));

export const ChartWrapper = styled("div")({
  margin: "0 -0.5rem",
});

export const DealsFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  marginTop: "1rem",
  padding: "0.875rem 1.25rem",
  background: "linear-gradient(90deg, rgba(5, 150, 105, 0.12) 0%, rgba(5, 150, 105, 0.06) 100%)",
  border: "1px solid rgba(5, 150, 105, 0.2)",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: 600,
  color: theme.palette.mode === "dark" ? "#34d399" : "#047857",

  "& svg": {
    color: theme.palette.mode === "dark" ? "#34d399" : "#059669",
  },
}));

export const EmptyState = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "3rem",
  color: theme.palette.text.primary,
  opacity: 0.7,
  fontSize: "15px",
  fontWeight: 500,
}));

