import { styled } from "@mui/material/styles";
import { Logo } from "@/components/atoms";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { CurrencySelector } from "@/components/atoms/CurrencySelector";

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoSection>
        <Logo />
        <PoweredBy>Powered by Amadeus</PoweredBy>
      </LogoSection>
      <ActionsSection>
        <CurrencySelector />
        <ThemeToggle />
      </ActionsSection>
    </HeaderWrapper>
  );
};

export { Header };

const HeaderWrapper = styled("header")(({ theme }) => ({
  padding: "1rem 1.5rem",
  borderBottom: `1px solid ${theme.palette.border.main}`,
  background: theme.palette.background.paper,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const LogoSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const PoweredBy = styled("span")(({ theme }) => ({
  fontSize: "11px",
  color: theme.palette.text.muted,
  fontWeight: 500,
}));

const ActionsSection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

