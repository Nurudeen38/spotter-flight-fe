import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { City } from "@/types";
import { Fragment, useState } from "react";
import { useCitySearch, useTopCities, useDebounceInput } from "@/hooks";
import { DEBOUNCE_DELAY_MS } from "@/constants";

interface IProps {
  label: string;
  error: string;
  value?: City | null;
  onSelect: (city: City | null) => void;
  placeholder?: string
}

const Input = ({ label, error, onSelect, value, placeholder }: IProps) => {
  const [input, setInput] = useState("");
  const searchTerm = useDebounceInput(input, DEBOUNCE_DELAY_MS);
  const { data: topCities } = useTopCities();
  const { data: options, isFetching } = useCitySearch(searchTerm);

  const displayOptions = input ? options?.data || [] : topCities || [];

  return (
    <InputWrapper className="input-wrapper">
      <label>{label}</label>
      <Autocomplete<City, false, false, false>
        fullWidth
        autoHighlight
        options={displayOptions}
        value={value}
        filterOptions={(x) => x}
        getOptionLabel={(opt) =>
          opt ? `${opt?.name} - ${opt?.address?.countryCode}` : ""
        }
        loading={isFetching}
        onInputChange={(_e, newInput) => {
          if (_e && _e.type === 'change') {
            setInput(newInput);
          }
        }}
        onChange={(_e, newVal) => onSelect(newVal)}
        renderOption={(props, option) => {
          const { key, ...otherProps } = props;
          return (
            <li key={key} {...otherProps}>
              <OptionWrapper>
                <IataCodeCircle $isAirport={option.subType === "AIRPORT"}>
                  {option.iataCode}
                </IataCodeCircle>
                <OptionContent>
                  <OptionTitle>
                    {option.subType === "AIRPORT"
                      ? (option.name.charAt(0).toUpperCase() + option.name.slice(1).toLowerCase() + " Airport")
                      : (option.name.charAt(0).toUpperCase() + option.name.slice(1).toLowerCase())}
                  </OptionTitle>
                  <OptionSubtitle>
                    {option.address.cityName.charAt(0).toUpperCase() + option.address.cityName.slice(1).toLowerCase()}, {option.address.countryName.charAt(0).toUpperCase() + option.address.countryName.slice(1).toLowerCase()}
                  </OptionSubtitle>
                </OptionContent>
              </OptionWrapper>
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            variant="outlined"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {isFetching ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              },
            }}
          />
        )}
      />
      {error && <p className="error" role="alert">{error}</p>}
    </InputWrapper>
  );
};

export { Input };

export const InputWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  "& label": {
    color: theme.palette.text.secondary,
    textTransform: "uppercase",
    fontSize: "0.75rem",
    fontWeight: 500,
    marginBottom: theme.customSpacing.space2,
  },
  "& .MuiAutocomplete-inputRoot": {
    padding: "1px 14px",
    background: theme.palette.background.input,
  },

  "& .MuiPickersInputBase-adornedEnd:hover": {
    "& fieldset": {
      borderColor: theme.palette.border.focus,
    },
  },
  "& .MuiInputBase-formControl, .MuiPickersOutlinedInput-root": {
    borderRadius: theme.borderRadius.lg,

    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.border.focus,
      },
    },
  },

  "& .MuiPickersSectionList-root": {
    padding: "10px 3px",
  },

  "& .MuiPickersTextField-root": {
    background: theme.palette.background.input,
  },

  "& input": {
    padding: "10px 16px",
  },

  "& fieldset": {
    border: `2px solid ${theme.palette.border.main}`,
  },

  "& .error": {
    color: theme.palette.error.main,
    fontSize: "0.75rem",
    marginTop: "5px",
  },
}));

const OptionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.customSpacing.space3,
  width: "100%",
}));

const IataCodeCircle = styled("div")<{ $isAirport: boolean }>(({ theme, $isAirport }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: $isAirport ? theme.palette.primary.light : theme.palette.background.paper,
  color: $isAirport ? theme.palette.primary.main : theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 600,
  fontSize: "0.75rem",
  flexShrink: 0,
  border: `1px solid ${$isAirport ? 'transparent' : theme.palette.border.main}`,
}));

const OptionContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const OptionTitle = styled("span")(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: "1rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const OptionSubtitle = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));


