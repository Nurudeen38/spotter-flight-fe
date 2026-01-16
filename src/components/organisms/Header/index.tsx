import styled from "styled-components";
import { Logo } from "../../atoms";
import { ThemeToggle } from "../../atoms/ThemeToggle";

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoSection>
        <Logo />
        <PoweredBy>Powered by Amadeus</PoweredBy>
      </LogoSection>
      <ThemeToggle />
    </HeaderWrapper>
  );
};

export { Header };

const HeaderWrapper = styled.header`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
  background: var(--background-card);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PoweredBy = styled.span`
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
`;
