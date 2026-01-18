import { styled } from "@mui/material/styles";
import { InputWrapper } from "@/components/atoms/Input";
import { Minus, PlusIcon } from "lucide-react";

interface IProps {
  label: string;
  error: string;
  value: number;
  onChange: (value: number) => void;
}

const InputNumber = ({ label, error, value, onChange }: IProps) => {
  return (
    <Wrapper className="input-wrapper">
      <label>{label}</label>
      <div className="buttons">
        <button type="button" onClick={() => onChange(value - 1)} disabled={value === 1}>
          <Minus />
        </button>
        <span>{value}</span>
        <button type="button" onClick={() => onChange(value + 1)}>
          <PlusIcon />
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </Wrapper>
  );
};

export { InputNumber };

const Wrapper = styled(InputWrapper)(({ theme }) => ({
  "& .buttons": {
    display: "flex",
    gap: "14px",
    alignItems: "center",

    "& button": {
      background: theme.palette.primary.light,
      border: "none",
      color: theme.palette.primary.main,
      height: "44px",
      width: "44px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      justifyContent: "center",

      "&:disabled": {
        background: theme.palette.border.light,
        cursor: "not-allowed",
      },
      "&:hover": {
        border: `1px solid ${theme.palette.primary.light}`,
        opacity: 0.8,
      },

      "& svg": {
        width: "16px",
        height: "16px",
      },
    },
  },
}));

