import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { InputWrapper } from "@/components/atoms/Input";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error: string;
  maxDate?: Date;
  minDate?: Date;
}

const DatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  error,
  maxDate,
  minDate,
}: IProps<T>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputWrapper>
            <label>{label}</label>
            <MUIDatePicker
              {...field}
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                field.onChange(date ?? null);
              }}
              maxDate={maxDate}
              minDate={minDate}
              disablePast
              format="yyyy/MM/dd"
            />
            {error && <p className="error">{error}</p>}
          </InputWrapper>
        )}
      />
    </LocalizationProvider>
  );
};

export { DatePicker };
