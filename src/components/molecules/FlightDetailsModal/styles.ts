import { styled } from "@mui/material/styles";
import { DialogTitle, DialogActions, Button } from "@mui/material";

// Styled Components
export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px !important",
    borderBottom: `1px solid ${theme.palette.border.light}`,
}));

export const TitleContainer = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: theme.palette.text.primary,

    "& .icon": {
        color: theme.palette.primary.main,
    },
}));

export const ModalContent = styled("div")({
    display: "flex",
    flexDirection: "column",
});

export const ScrollableContent = styled("div")({
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
});

export const PriceOverview = styled("div")(({ theme }) => ({
    background: theme.palette.primary.light,
    padding: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.primary.light}`,
}));

export const PriceInfo = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",

    "& .label": {
        fontSize: "0.75rem",
        textTransform: "uppercase",
        fontWeight: 600,
        letterSpacing: "0.5px",
        color: theme.palette.primary.main,
        marginBottom: "2px",
    },

    "& .value": {
        fontSize: "1.5rem",
        fontWeight: 800,
        color: theme.palette.primary.main,
        lineHeight: 1.1,
    },

    "& .sub": {
        fontSize: "0.8rem",
        color: theme.palette.text.secondary,
        marginTop: "2px",
    },
}));

export const ItinerarySection = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "32px",
});

export const SectionHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "8px",
    borderBottom: `1px solid ${theme.palette.border.light}`,

    "& .leg-label": {
        fontWeight: 700,
        color: theme.palette.text.primary,
        fontSize: "0.95rem",
    },

    "& .date-label": {
        color: theme.palette.text.secondary,
        fontSize: "0.9rem",
    },

    "& .duration-label": {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        color: theme.palette.text.muted,
        fontSize: "0.8rem",
        background: theme.palette.background.default,
        padding: "2px 8px",
        borderRadius: "12px",
    },
}));

export const SegmentsList = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
});

export const SegmentItem = styled("div")({
    display: "flex",
    gap: "16px",
});

export const Timeline = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60px",
    flexShrink: 0,
});

export const TimeNode = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "100%",
    position: "relative",
    height: "38px",

    "&:last-child": {
        height: "auto",
    },

    "& .time": {
        fontWeight: 700,
        fontSize: "0.9rem",
        color: theme.palette.text.primary,
        position: "absolute",
        right: "20px",
        top: "-4px",
    },

    "& .dot": {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        border: `2px solid ${theme.palette.primary.main}`,
        background: theme.palette.primary.main,
        position: "absolute",
        right: 0,
        top: "2px",
        zIndex: 2,

        "&.destination": {
            background: "white",
        },
    },

    "& .line": {
        position: "absolute",
        right: "4px",
        top: "12px",
        background: theme.palette.border.main,
        width: "2px",
        height: "130%",
        zIndex: 1,
    },
}));

export const DetailsColumn = styled("div")(({ theme }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    paddingTop: 0,

    "& .top-row": {
        display: "flex",
        alignItems: "baseline",
        gap: "12px",

        "& .airport-code": {
            fontSize: "1.5rem",
            fontWeight: 700,
            color: theme.palette.text.secondary,
            lineHeight: 1,
        },

        "& .duration": {
            fontSize: "0.9rem",
            color: theme.palette.text.secondary,
            fontWeight: 500,
        },
    },

    "& .airline-row": {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        alignItems: "center",
    },
}));

export const InfoBadge = styled("span")(({ theme }) => ({
    fontSize: "0.75rem",
    fontWeight: 700,
    padding: "6px 12px",
    borderRadius: "8px",
    background: theme.palette.chip.background,
    color: theme.palette.chip.text,
    border: `1px solid ${theme.palette.chip.border}`,
    letterSpacing: "0.5px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s ease",
}));

export const LayoverBanner = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.8rem",
    color: theme.palette.warning.main,
    background: theme.palette.warning.light,
    padding: "6px 10px",
    borderRadius: "6px",
    marginTop: "24px",
    marginBottom: "8px",
    fontWeight: 500,
}));

export const IncludedServices = styled("div")(({ theme }) => ({
    background: theme.palette.background.default,
    padding: "16px",
    borderRadius: "12px",
    border: `1px dashed ${theme.palette.border.main}`,
    marginTop: "24px",
}));

export const ServiceTitle = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: theme.palette.success.main,
    marginBottom: "12px",
}));

export const ServicesList = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
});

export const ServiceChip = styled("span")(({ theme }) => ({
    fontSize: "0.75rem",
    background: theme.palette.success.light,
    color: theme.palette.text.primary,
    padding: "4px 10px",
    borderRadius: "12px",
    fontWeight: 500,
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: "16px 24px 24px !important",
    borderTop: `1px solid ${theme.palette.border.light}`,
}));

export const BookButton = styled(Button)(({ theme }) => ({
    backgroundColor: `${theme.palette.primary.main} !important`,
    padding: "12px !important",
    fontWeight: "600 !important",
    borderRadius: "8px !important",
    textTransform: "none !important",
    fontSize: "1rem !important",
}));

