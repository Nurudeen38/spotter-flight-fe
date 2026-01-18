import { Button as MUIButton } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IProps {
  children: React.ReactNode;
}

const Button = ({ children }: IProps) => {
  return (
    <ButtonWrapper className="shadow-md" type="submit" variant="contained">
      {children}
    </ButtonWrapper>
  );
};

export { Button };

export const ButtonWrapper = styled(MUIButton)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main} !important`,
  color: `${theme.palette.primary.contrastText} !important`,
  transition: "all 0.2s ease",
  borderRadius: "10px",
  textTransform: "none",
  fontWeight: 600,

  "&:hover": {
    backgroundColor: `${theme.palette.primary.dark} !important`,
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(15, 181, 174, 0.3)",
  },

  "&:active": {
    transform: "scale(0.98)",
  },
}));

