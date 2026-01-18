import { styled } from "@mui/material/styles";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type IRadioItem = {
  label: string;
  value: string;
};

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  items: IRadioItem[];
}

const Radios = <T extends FieldValues>({ control, name, items }: IProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ToggleContainer className="radios">
          {items.map((item) => (
            <ToggleButton
              key={item.value}
              type="button"
              $isActive={field.value === item.value}
              onClick={() => field.onChange(item.value)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </ToggleContainer>
      )}
    />
  );
};

export { Radios };

const ToggleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 0,
  borderRadius: "10px",
  overflow: "hidden",
  border: `1px solid ${theme.palette.border.main}`,
  background: theme.palette.background.paper,
  width: "100%",
}));

const ToggleButton = styled("button")<{ $isActive: boolean }>(({ theme, $isActive }) => ({
  flex: 1,
  padding: "0.625rem 1.5rem",
  fontSize: "14px",
  fontWeight: 500,
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease",
  minWidth: "120px",

  background: $isActive ? theme.palette.primary.main : theme.palette.background.paper,
  color: $isActive ? theme.palette.background.default : theme.palette.text.secondary,

  "&:hover": {
    background: $isActive ? theme.palette.primary.main : theme.palette.background.paper,
    color: $isActive ? theme.palette.background.default : theme.palette.text.primary,
  },

  "&:focus": {
    outline: "none",
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    zIndex: 1,
    position: "relative",
  },

  "&:first-of-type": {
    borderRadius: "9px 0 0 9px",
  },

  "&:last-of-type": {
    borderRadius: "0 9px 9px 0",
  },
}));

