/**
 * Theme configuration using CSS custom properties.
 * 
 * These values reference CSS variables defined in index.css, enabling
 * automatic theme switching between light and dark modes.
 * 
 * @example
 * import { theme } from '@/utils';
 * 
 * const StyledButton = styled.button`
 *   background: ${theme.primary};
 *   color: ${theme.text};
 * `;
 */
export const theme = {
  // Brand colors
  primary: "var(--primary)",
  primaryHover: "var(--primary-hover)",
  primaryLight: "var(--primary-light)",

  // Legacy blue (for gradients)
  blue: "var(--blue)",
  blueLight: "var(--blue-light)",

  // Additional colors
  warning: "var(--warning)",
  warningLight: "var(--warning-light)",
  success: "var(--success)",
  successLight: "var(--success-light)",

  // Text colors
  text: "var(--text)",
  textSecondary: "var(--text-secondary)",
  textMuted: "var(--text-muted)",

  // Backgrounds
  background: "var(--background)",
  backgroundCard: "var(--background-card)",
  inputBackground: "var(--input-background)",

  // Borders
  border: "var(--border)",
  borderLight: "var(--border-light)",
  borderFocus: "var(--border-focus)",

  // States
  required: "var(--error)",
  error: "var(--error)",


  // Typography
  fontXs: "var(--font-xs)",
  fontSm: "var(--font-sm)",
  fontBase: "var(--font-base)",
  fontMd: "var(--font-md)",
  fontLg: "var(--font-lg)",
  fontXl: "var(--font-xl)",
  font2xl: "var(--font-2xl)",
  font3xl: "var(--font-3xl)",

  // Font Weights
  fontNormal: "var(--font-normal)",
  fontMedium: "var(--font-medium)",
  fontSemibold: "var(--font-semibold)",
  fontBold: "var(--font-bold)",

  // Spacing
  space1: "var(--space-1)",
  space2: "var(--space-2)",
  space3: "var(--space-3)",
  space4: "var(--space-4)",
  space6: "var(--space-6)",
  space8: "var(--space-8)",
  space10: "var(--space-10)",
  space12: "var(--space-12)",
  space16: "var(--space-16)",

  // Border Radius
  radiusSm: "var(--radius-sm)",
  radiusMd: "var(--radius-md)",
  radiusLg: "var(--radius-lg)",
  radiusXl: "var(--radius-xl)",
  radius2xl: "var(--radius-2xl)",
  radiusFull: "var(--radius-full)",

  // Shadows
  shadowSm: "var(--shadow-sm)",
  shadowMd: "var(--shadow-md)",
  shadowLg: "var(--shadow-lg)",

  // Transitions
  transitionFast: "var(--transition-fast)",
  transitionBase: "var(--transition-base)",
  transitionSlow: "var(--transition-slow)",
};

export type ThemeType = typeof theme;

