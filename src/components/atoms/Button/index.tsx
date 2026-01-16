import { Button as MUIButton } from "@mui/material";
import styled from "styled-components";

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

const ButtonWrapper = styled(MUIButton)`
  background-color: var(--primary, #0fb5ae) !important;
  color: #134e4a !important;
  transition: all 0.2s ease;
  border-radius: 10px;
  text-transform: none;
  font-weight: 600;

  &:hover {
    background-color: var(--primary-hover, #0da39c) !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(15, 181, 174, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;
