import { useEffect } from "react";
import { ArrowLeftRight, Search } from "lucide-react";
import { Select, MenuItem, CircularProgress } from "@mui/material";
import { startOfDay } from "date-fns";
import {
    DatePicker,
    Input,
    InputNumber,
    Radios,
} from "../../";
import { useFlightFormUrlSync, useFlightSearchState } from "../../../hooks";
import { useFlightSearchContext } from "../../../context/FlightSearchContext";
import { buildFlightSearchUrl, buildSearchFormData, isValidFormData } from "../../../utils";
import { TRIP_TYPES, CABIN_CLASS_OPTIONS } from "../../../constants";
import type { FlightFormSchema } from "../../../schemas/flightFormSchema";
import type { City } from "../../../types";
import {
    SearchCard,
    FormGrid,
    LocationInputs,
    SwapButton,
    DateInputs,
    OtherInputs,
    SelectWrapper,
    SearchButton,
} from "../../../pages/SearchPage/styled";

export const SearchForm = () => {
    const { isLoading, isFetching } = useFlightSearchContext();
    const { setSearchParams } = useFlightSearchState();
    const fetching = isLoading || isFetching;

    const {
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useFlightFormUrlSync();

    const {
        departure,
        return: returnDateValue,
        type: tripType,
        from: fromValue,
        to: toValue,
        passengers: passengersValue,
        travelClass,
    } = watch();

    useEffect(() => {
        if (tripType === TRIP_TYPES.ONE_WAY && returnDateValue) {
            setValue("return", null, { shouldValidate: false });
        }
    }, [tripType, returnDateValue, setValue]);

    const onSubmit = (formData: FlightFormSchema) => {
        if (!isValidFormData(formData)) {
            return;
        }
        const searchData = buildSearchFormData(formData);
        const urlParams = buildFlightSearchUrl(searchData);
        setSearchParams(urlParams);
    };

    const handleSwapLocations = () => {
        const from = fromValue;
        const to = toValue;
        setValue("from", to, { shouldDirty: true });
        setValue("to", from, { shouldDirty: true });
    };

    return (
        <SearchCard className="styled-card" onSubmit={handleSubmit(onSubmit)}>
            <Radios
                control={control}
                name="type"
                items={[
                    { label: "Round-trip", value: TRIP_TYPES.ROUND_TRIP },
                    { label: "One-way", value: TRIP_TYPES.ONE_WAY },
                ]}
            />

            <FormGrid>
                <LocationInputs>
                    <Input
                        label="From"
                        onSelect={(value) => setValue("from", value, { shouldDirty: true })}
                        value={fromValue as City}
                        error={errors.from?.message?.toString() || ""}
                        placeholder="Where from?"
                    />
                    <SwapButton type="button" onClick={handleSwapLocations}>
                        <ArrowLeftRight size={18} />
                    </SwapButton>
                    <Input
                        label="To"
                        onSelect={(value) => setValue("to", value, { shouldDirty: true })}
                        value={toValue as City}
                        error={errors.to?.message?.toString() || ""}
                        placeholder="Where to?"
                    />
                </LocationInputs>

                <DateInputs>
                    <DatePicker
                        control={control}
                        name="departure"
                        label="Departure Date"
                        error={errors.departure?.message || ""}
                        maxDate={returnDateValue ? new Date(returnDateValue) : undefined}
                    />
                    {tripType === TRIP_TYPES.ROUND_TRIP && (
                        <DatePicker
                            control={control}
                            name="return"
                            label="Return Date"
                            minDate={departure ? new Date(departure) : startOfDay(new Date())}
                            error={errors.return?.message || ""}
                        />
                    )}
                </DateInputs>

                <OtherInputs>
                    <InputNumber
                        value={passengersValue}
                        onChange={(value) => setValue("passengers", value)}
                        label="Passengers"
                        error={errors.passengers?.message || ""}
                    />
                    <SelectWrapper className="input-wrapper">
                        <label htmlFor="cabin-class-select">Cabin Class</label>
                        <Select
                            id="cabin-class-select"
                            variant="outlined"
                            value={travelClass}
                            defaultValue={travelClass}
                            onChange={(e) => setValue("travelClass", e.target.value as "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST")}
                            fullWidth
                        >
                            {CABIN_CLASS_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </SelectWrapper>
                </OtherInputs>
            </FormGrid>

            <SearchButton type="submit" disabled={fetching}>
                {fetching ? (
                    <>
                        <CircularProgress size={20} color="inherit" thickness={4} />
                        Searching...
                    </>
                ) : (
                    <>
                        <Search size={18} />
                        Search Flights
                    </>
                )}
            </SearchButton>
        </SearchCard>
    );
};
