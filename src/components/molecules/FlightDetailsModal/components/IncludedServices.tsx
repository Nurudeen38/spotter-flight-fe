import { CheckCircle2 } from "lucide-react";
import type { FlightOffer } from "@/types";
import { IncludedServices as StyledIncludedServices, ServiceTitle, ServicesList, ServiceChip } from "@/components/molecules/FlightDetailsModal/styles";

interface IncludedServicesProps {
    pricingOptions: FlightOffer["pricingOptions"];
}

export const IncludedServices = ({ pricingOptions }: IncludedServicesProps) => {
    return (
        <StyledIncludedServices>
            <ServiceTitle>
                <CheckCircle2 size={16} /> Included
            </ServiceTitle>
            <ServicesList>
                {pricingOptions.includedCheckedBagsOnly && (
                    <ServiceChip>Checked Bags</ServiceChip>
                )}
                <ServiceChip>Cabin Bag</ServiceChip>
                <ServiceChip>Seat Selection</ServiceChip>
            </ServicesList>
        </StyledIncludedServices>
    );
};
