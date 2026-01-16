import { Link } from "react-router-dom";
import styled from "styled-components";
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

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  & p {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
    & span {
      color: var(--primary);
    }
  }

  & .logo {
    background: linear-gradient(135deg, var(--primary) 0%, #0da39c 100%);
    width: 36px;
    height: 36px;
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    & svg {
      width: 20px;
      height: 20px;
    }
  }
`;
