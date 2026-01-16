import z from "zod";
import type { City } from "../interfaces";

export type TripType = "one-way" | "round-trip";

export type CabinClass = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";

export const flightFormSchema = z
  .object({
    type: z.string().min(1, "Required!"),
    from: z
      .any()
      .refine((val) => val && val.iataCode, "Please select departure city"),
    to: z
      .any()
      .refine((val) => val && val.iataCode, "Please select destination city"),
    departure: z.date().min(new Date(), "Departure date must be in the future"),
    return: z.date().optional().nullable(),
    passengers: z.number().min(1, "Required!"),
    travelClass: z.enum(["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"]),
  })
  .superRefine((val, ctx) => {
    if (val.type === "round-trip" && !val.return) {
      ctx.addIssue({
        path: ["return"],
        code: z.ZodIssueCode.custom,
        message: "Return date is required for a round‑trip",
      });
    }

    // Extra guard: if both dates exist, return must be after departure
    if (val.departure && val.return && val.return <= val.departure) {
      ctx.addIssue({
        path: ["return"],
        code: z.ZodIssueCode.custom,
        message: "Return date must be after departure",
      });
    }
  });

export type FlightFormSchema = z.infer<typeof flightFormSchema>;

export interface FlightFormValues {
  type: TripType;
  from: City | null;
  to: City | null;
  departure: Date | null;
  return: Date | null;
  passengers: number;
  travelClass: CabinClass;
}

