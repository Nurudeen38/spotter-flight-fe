import { styled } from "@mui/material/styles";
import { FORM_DEFAULTS, RESPONSIVE_BREAKPOINTS } from "@/constants";

/**
 * Container for loading states with skeleton placeholders.
 */
export const LoadingSkeleton = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",

  "& .MuiSkeleton-pulse": {
    borderRadius: theme.borderRadius.lg,
  },
}));

/**
 * Empty state message display.
 */
export const EmptyState = styled("div")(({ theme }) => ({
  textAlign: "center",
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  padding: theme.customSpacing.space12,
}));

export const FlexContainer = styled("div")({
  display: "flex",
  gap: FORM_DEFAULTS.GAP_LARGE,
  alignItems: "center",

  [`@media (max-width: ${RESPONSIVE_BREAKPOINTS.MOBILE}px)`]: {
    flexDirection: "column",
    gap: FORM_DEFAULTS.GAP_MEDIUM,
  },
});

export const SwapButton = styled("div")(({ theme }) => ({
  width: `${FORM_DEFAULTS.SWAP_SIZE}px`,
  height: `${FORM_DEFAULTS.SWAP_SIZE}px`,
  background: theme.palette.secondary.light,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,

  "& svg": {
    width: `${FORM_DEFAULTS.SWAP_ICON_SIZE}px`,
  },
}));

export const FormCard = styled("form")({
  maxWidth: `${FORM_DEFAULTS.MAX_CARD_WIDTH}px`,
  margin: `${FORM_DEFAULTS.GAP_SMALL} auto`,
  display: "flex",
  flexDirection: "column",
  gap: FORM_DEFAULTS.GAP_SMALL,

  "& .radios": {
    justifyContent: "center",
  },

  "& > button": {
    minWidth: `${FORM_DEFAULTS.BUTTON_MIN_WIDTH}px`,
    margin: "0 auto",
    minHeight: `${FORM_DEFAULTS.BUTTON_MIN_HEIGHT}px`,
  },

  [`@media (max-width: ${RESPONSIVE_BREAKPOINTS.MOBILE}px)`]: {
    "& > button": {
      minWidth: "100%",
      marginTop: FORM_DEFAULTS.GAP_SMALL,
    },
  },
});

export const PageWrapper = styled("div")({
  maxWidth: `${RESPONSIVE_BREAKPOINTS.DESKTOP}px`,
  margin: "0 auto",
  padding: "20px",

  [`@media (max-width: ${RESPONSIVE_BREAKPOINTS.TABLET}px)`]: {
    padding: "15px",
  },

  [`@media (max-width: ${RESPONSIVE_BREAKPOINTS.MOBILE}px)`]: {
    padding: "10px",
  },
});
