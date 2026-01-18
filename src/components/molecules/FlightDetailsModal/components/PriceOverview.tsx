import type { Price } from "@/types";
import { formatCurrency } from "@/utils/formatUtils";
import { PriceOverview as StyledPriceOverview, PriceInfo } from "@/components/molecules/FlightDetailsModal/styles";

interface PriceOverviewProps {
    price: Price;
    travelerCount: number;
}

export const PriceOverview = ({ price, travelerCount }: PriceOverviewProps) => {
    return (
        <StyledPriceOverview>
            <PriceInfo>
                <span className="label">Total Price</span>
                <span className="value">
                    {formatCurrency(price.total, price.currency)}
                </span>
                <span className="sub">
                    for {travelerCount} traveler{travelerCount > 1 ? "s" : ""}
                </span>
            </PriceInfo>
        </StyledPriceOverview>
    );
};
