import { styled } from "@mui/material/styles";
import { Pagination } from "@mui/material";

export const PageWrapper = styled("div")(({ theme }) => ({
  maxWidth: "1000px",
  margin: "0 auto",
  padding: theme.customSpacing.space8,

  "@media (max-width: 768px)": {
    padding: theme.customSpacing.space4,
  },
}));

export const HeroSection = styled("section")(({ theme }) => ({
  marginBottom: theme.customSpacing.space8,
}));

export const ResultsSection = styled("section")({});

// ============================================================================
// Hero Typography
// ============================================================================

export const Tagline = styled("p")(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 500,
  color: theme.palette.text.muted,
  marginBottom: theme.customSpacing.space2,
}));

export const Title = styled("h1")(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.customSpacing.space2,
  lineHeight: 1.2,

  "@media (max-width: 575px)": {
    fontSize: "1.25rem",
  },
}));

export const Description = styled("p")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  marginBottom: theme.customSpacing.space6,
  maxWidth: "600px",
}));

// ============================================================================
// Search Form Components
// ============================================================================

export const SearchCard = styled("form")(({ theme }) => ({
  marginBottom: theme.customSpacing.space8,

  "& .radios": {
    marginBottom: theme.customSpacing.space4,
  },
}));

export const FormGrid = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.customSpacing.space4,
}));

export const LocationInputs = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.customSpacing.space4,
  alignItems: "flex-end",

  "& > .input-wrapper": {
    flex: 1,
  },

  "@media (max-width: 575px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const SwapButton = styled("button")(({ theme }) => ({
  width: "40px",
  height: "40px",
  minWidth: "40px",
  background: theme.palette.primary.light,
  border: "none",
  borderRadius: theme.borderRadius.full,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  cursor: "pointer",
  transition: theme.customTransitions.base,
  marginBottom: "4px",

  "&:hover": {
    background: theme.palette.primary.main,
    color: "white",
    transform: "rotate(180deg)",
  },

  "@media (max-width: 575px)": {
    alignSelf: "center",
    margin: 0,
  },
}));

export const DateInputs = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.customSpacing.space4,


  "& > *": {
    flex: 1,
  },


  "& > * > div": {
    flex: 1,
    borderRadius: theme.borderRadius.lg,
  },

  "@media (max-width: 575px)": {
    flexDirection: "column",
  },
}));

export const OtherInputs = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.customSpacing.space4,

  "& > *": {
    flex: 1,
  },

  "@media (max-width: 575px)": {
    flexDirection: "column",
  },
}));

export const SelectWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  "& label": {
    color: theme.palette.text.secondary,
    textTransform: "uppercase",
    fontSize: "0.75rem",
    fontWeight: 500,
    marginBottom: theme.customSpacing.space2,
  },

  "& .MuiOutlinedInput-root": {
    borderRadius: theme.borderRadius.lg,
    background: theme.palette.background.input,

    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.border.focus,
      },
    },
  },

  "& .MuiSelect-select": {
    padding: "10px 16px",
  },

  "& fieldset": {
    border: `2px solid ${theme.palette.border.main}`,
  },
}));

export const SearchButton = styled("button")(({ theme }) => ({
  width: "100%",
  margin: `${theme.customSpacing.space6} auto 0`,
  padding: `0.875rem ${theme.customSpacing.space6}`,
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: "none",
  borderRadius: theme.borderRadius.lg,
  fontSize: "0.875rem",
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.customSpacing.space2,
  transition: theme.customTransitions.base,

  "&:hover": {
    background: theme.palette.primary.dark,
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(15, 181, 174, 0.3)",
  },

  "&:active": {
    transform: "scale(0.98)",
  },

  "&:disabled": {
    opacity: 0.7,
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  },

  "@media (max-width: 575px)": {
    maxWidth: "100%",
  },
}));

export const EmptyStateWrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: `${theme.customSpacing.space16} ${theme.customSpacing.space8}`,
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border.light}`,
  borderRadius: theme.borderRadius.xl,
}));

export const EmptyIcon = styled("div")(({ theme }) => ({
  width: "80px",
  height: "80px",
  margin: `0 auto ${theme.customSpacing.space6}`,
  background: theme.palette.primary.light,
  borderRadius: theme.borderRadius.full,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

export const EmptyTitle = styled("h2")(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.customSpacing.space2,
}));

export const EmptyDescription = styled("p")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  maxWidth: "400px",
  margin: "0 auto",
}));

export const ResultsInfo = styled("div")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  marginBottom: theme.customSpacing.space4,
  fontWeight: 500,
}));

export const PaginationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.customSpacing.space8,
  marginBottom: theme.customSpacing.space8,
  padding: theme.customSpacing.space4,
}));

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: theme.palette.text.primary,
    borderColor: theme.palette.border.main,
    borderRadius: theme.borderRadius.lg,
    fontFamily: "inherit",
    fontWeight: 500,
    transition: theme.customTransitions.base,

    "&:hover": {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },

    "&.Mui-selected": {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: "white",
      borderColor: theme.palette.primary.main,

      "&:hover": {
        backgroundColor: `${theme.palette.primary.dark} !important`,
      },
    },

    "&.MuiPaginationItem-ellipsis": {
      color: theme.palette.text.secondary,
    },
  },
}));

