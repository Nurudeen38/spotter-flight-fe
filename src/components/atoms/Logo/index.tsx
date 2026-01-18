import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { PlaneIcon } from "lucide-react";

const Logo = () => {
  return (
    <LogoWrapper to={"/"}>
      <div className="logo shadow-lg">
        <PlaneIcon />
      </div>
      <p>
        Spotter <span>Flight Search</span>
      </p>
    </LogoWrapper>
  );
};

export { Logo };

const LogoWrapper = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textDecoration: "none",

  "& p": {
    fontSize: "1rem",
    fontWeight: 600,
    color: theme.palette.text.primary,
    "& span": {
      color: theme.palette.primary.main,
    },
  },

  "& .logo": {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #0da39c 100%)`,
    width: "36px",
    height: "36px",
    color: "white",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& svg": {
      width: "20px",
      height: "20px",
    },
  },
}));

