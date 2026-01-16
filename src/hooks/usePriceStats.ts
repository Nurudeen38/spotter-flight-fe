import { useMemo } from "react";
import type { FlightOffer } from "../interfaces";
import { formatCurrency } from "../utils/formatUtils";

export interface PriceDataPoint {
    priceRange: string;
    price: number;
    count: number;
    flightIds: string[];
}

export const usePriceStats = (flightOffers: FlightOffer[]) => {
    // Calculate price statistics
    const stats = useMemo(() => {
        if (!flightOffers || flightOffers.length === 0) {
            return { lowest: 0, average: 0, highest: 0, currency: "USD" };
        }

        const prices = flightOffers.map((offer) => parseFloat(offer.price.total));
        const lowest = Math.min(...prices);
        const highest = Math.max(...prices);
        const average = prices.reduce((a, b) => a + b, 0) / prices.length;
        const currency = flightOffers[0]?.price.currency || "USD";

        return { lowest, average, highest, currency };
    }, [flightOffers]);

    // Calculate trend (comparing first half vs second half of prices)
    const trend = useMemo(() => {
        if (!flightOffers || flightOffers.length < 2) {
            return { percentage: 0, isUp: true };
        }

        const prices = flightOffers.map((offer) => parseFloat(offer.price.total));
        const midPoint = Math.floor(prices.length / 2);
        const firstHalf = prices.slice(0, midPoint);
        const secondHalf = prices.slice(midPoint);

        const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

        const percentage = ((secondAvg - firstAvg) / firstAvg) * 100;

        return {
            percentage: Math.abs(percentage),
            isUp: percentage > 0,
        };
    }, [flightOffers]);

    // Calculate deals below average
    const dealsInfo = useMemo(() => {
        if (!flightOffers || flightOffers.length === 0) {
            return { dealCount: 0, greatDeals: 0, maxSavings: 0 };
        }

        const prices = flightOffers.map((offer) => parseFloat(offer.price.total));
        const average = prices.reduce((a, b) => a + b, 0) / prices.length;
        const lowest = Math.min(...prices);

        const belowAverage = prices.filter((p) => p < average).length;
        const greatDeals = prices.filter((p) => p < average * 0.8).length;
        const maxSavings = average - lowest;

        return { dealCount: belowAverage, greatDeals, maxSavings };
    }, [flightOffers]);

    // Group flights by price ranges for the area chart
    const data = useMemo((): PriceDataPoint[] => {
        if (!flightOffers || flightOffers.length === 0) return [];

        const prices = flightOffers.map((offer) => ({
            price: parseFloat(offer.price.total),
            id: offer.id,
        }));

        const minPrice = Math.min(...prices.map((p) => p.price));
        const maxPrice = Math.max(...prices.map((p) => p.price));
        const range = maxPrice - minPrice;

        // Create 5 buckets
        const bucketCount = Math.min(5, prices.length);
        const bucketSize = range / bucketCount;

        const buckets: PriceDataPoint[] = [];

        for (let i = 0; i < bucketCount; i++) {
            const rangeStart = minPrice + i * bucketSize;
            const rangeEnd = minPrice + (i + 1) * bucketSize;

            const flightsInBucket = prices.filter(
                (p) =>
                    i === bucketCount - 1
                        ? p.price >= rangeStart && p.price <= rangeEnd
                        : p.price >= rangeStart && p.price < rangeEnd
            );

            // Calculate average price for this bucket
            const avgPrice =
                flightsInBucket.length > 0
                    ? flightsInBucket.reduce((sum, f) => sum + f.price, 0) /
                    flightsInBucket.length
                    : (rangeStart + rangeEnd) / 2;

            buckets.push({
                priceRange: `${formatCurrency(rangeStart, stats.currency)}-${formatCurrency(rangeEnd, stats.currency)}`,
                price: avgPrice,
                count: flightsInBucket.length,
                flightIds: flightsInBucket.map((f) => f.id),
            });
        }

        return buckets;
    }, [flightOffers, stats.currency]);

    return { stats, trend, dealsInfo, data };
};
