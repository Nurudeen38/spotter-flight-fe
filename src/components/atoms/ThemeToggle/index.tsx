import { styled } from "@mui/material/styles";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </ToggleButton>
  );
};

export { ThemeToggle };

const ToggleButton = styled("button")(({ theme }) => ({
  background: "transparent",
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: "8px",
  padding: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  transition: "all 0.2s ease",

  "&:hover": {
    background: theme.palette.primary.light,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));

