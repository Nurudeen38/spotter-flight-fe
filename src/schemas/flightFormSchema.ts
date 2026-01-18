import z from "zod";
import type { City, TripType, CabinClass } from "../types";

export type { TripType, CabinClass };

export const citySchema = z.object({
  iataCode: z.string(),
  name: z.string(),
  detailedName: z.string().optional(),
  type: z.string(),
  subType: z.string(),
  id: z.string().optional(),
  timeZoneOffset: z.string().optional(),
  self: z.object({
    href: z.string(),
    methods: z.array(z.string())
  }).optional(),
  address: z.object({
    cityName: z.string().optional(),
    cityCode: z.string().optional(),
    countryName: z.string().optional(),
    countryCode: z.string(),
    regionCode: z.string().optional(),
    stateCode: z.string().optional().or(z.literal("")),
  }),
  geoCode: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }).optional(),
  analytics: z.object({
    travelers: z.object({
      score: z.number()
    })
  }).optional()
});

export const flightFormSchema = z
  .object({
    type: z.string().min(1, "Required!"),
    from: citySchema
      .nullable()
      .refine((val) => val && val.iataCode, "Please select departure city"),
    to: citySchema
      .nullable()
      .refine((val) => val && val.iataCode, "Please select destination city"),
    departure: z.date().min(new Date(new Date().setHours(0, 0, 0, 0)), "Departure date must be in the future"),
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
