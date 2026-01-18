import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import styled from "styled-components";
import { theme } from "../../../utils";
import type { City } from "../../../types";
import { Fragment, useState } from "react";
import { useCitySearch, useTopCities, useDebounceInput } from "../../../hooks";
import { DEBOUNCE_DELAY_MS } from "../../../constants";

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

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & label {
    color: ${theme.textSecondary};
    text-transform: uppercase;
    font-size: ${theme.fontSm};
    font-weight: ${theme.fontMedium};
    margin-bottom: ${theme.space2};
  }
  & .MuiAutocomplete-inputRoot {
    padding: 1px 14px;
    background: ${theme.inputBackground};
  }

  & .MuiPickersInputBase-adornedEnd:hover {
    & fieldset {
      border-color: ${theme.borderFocus};
    }
  }
  & .MuiInputBase-formControl,
  .MuiPickersOutlinedInput-root {
    border-radius: ${theme.radiusLg};

    &:hover {
      & .MuiOutlinedInput-notchedOutline {
        border-color: ${theme.borderFocus};
      }
    }
  }

  & .MuiPickersSectionList-root {
    padding: 10px 3px;
  }

  & .MuiPickersTextField-root {
    background: ${theme.inputBackground};
  }

  & input {
    padding: 10px 16px;
  }

  & fieldset {
    border: 2px solid ${theme.border};
  }

  & .error {
    color: ${theme.error};
    font-size: ${theme.fontSm};
    margin-top: 5px;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space3};
  width: 100%;
`;

const IataCodeCircle = styled.div<{ $isAirport: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$isAirport ? theme.primaryLight : theme.backgroundCard};
  color: ${props => props.$isAirport ? theme.primary : theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontSemibold};
  font-size: ${theme.fontSm};
  flex-shrink: 0;
  border: 1px solid ${props => props.$isAirport ? 'transparent' : theme.border};
`;

const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const OptionTitle = styled.span`
  color: ${theme.text};
  font-weight: ${theme.fontMedium};
  font-size: ${theme.fontMd};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OptionSubtitle = styled.span`
  color: ${theme.textSecondary};
  font-size: ${theme.fontSm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

