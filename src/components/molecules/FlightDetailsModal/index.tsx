import { Dialog, DialogContent, IconButton } from "@mui/material";
import { Plane, X } from "lucide-react";
import type { FlightOffer } from "../../../types";
import { IncludedServices } from "./components/IncludedServices";
import { ItineraryList } from "./components/ItineraryList";
import { PriceOverview } from "./components/PriceOverview";
import {
    BookButton,
    ModalContent,
    ScrollableContent,
    StyledDialogActions,
    StyledDialogTitle,
    TitleContainer,
} from "./styles";

interface FlightDetailsModalProps {
    open: boolean;
    onClose: () => void;
    flightOffer: FlightOffer | null;
    carrierDictionary?: Record<string, string>;
    aircraftDictionary?: Record<string, string>;
}

export const FlightDetailsModal = ({
    open,
    onClose,
    flightOffer,
    carrierDictionary,
    aircraftDictionary,
}: FlightDetailsModalProps) => {
    if (!flightOffer) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: {
                    borderRadius: "16px",
                    padding: "0",
                    background: "var(--background-card)",
                    boxShadow: "var(--shadow-lg)",
                    minHeight: "80vh",
                },
            }}
        >
            <StyledDialogTitle>
                <TitleContainer>
                    <Plane size={24} className="icon" />
                    <span>Flight Details</span>
                </TitleContainer>
                <IconButton onClick={onClose} size="small">
                    <X size={20} />
                </IconButton>
            </StyledDialogTitle>

            <DialogContent sx={{ p: "0 !important" }}>
                <ModalContent>
                    <PriceOverview
                        price={flightOffer.price}
                        travelerCount={flightOffer.travelerPricings.length}
                    />

                    <ScrollableContent>
                        <ItineraryList
                            flightOffer={flightOffer}
                            carrierDictionary={carrierDictionary}
                            aircraftDictionary={aircraftDictionary}
                        />

                        <IncludedServices pricingOptions={flightOffer.pricingOptions} />
                    </ScrollableContent>
                </ModalContent>
            </DialogContent>

            <StyledDialogActions>
                <BookButton
                    variant="contained"
                    fullWidth
                    disableElevation
                    onClick={onClose}
                >
                    Select This Flight
                </BookButton>
            </StyledDialogActions>
        </Dialog>
    );
};
