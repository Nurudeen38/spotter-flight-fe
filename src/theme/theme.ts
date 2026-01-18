import { createTheme, type PaletteMode } from "@mui/material";

// Design tokens - these match the current CSS variables exactly
const tokens = {
    colors: {
        primary: {
            main: "#0fb5ae",
            hover: "#0da39c",
            light: "rgba(15, 181, 174, 0.12)",
            lightDark: "rgba(15, 181, 174, 0.15)", // Dark mode variant
        },
        blue: {
            main: "#215ce5",
            light: "rgba(33, 92, 229, 0.12)",
        },
        error: "#ef4444",
        warning: {
            main: "#f59e0b",
            light: "#fffbeb",
            lightDark: "rgba(245, 158, 11, 0.15)",
        },
        success: {
            main: "#22c55e",
            light: "#dcfce7",
            lightDark: "rgba(34, 197, 94, 0.15)",
        },
    },
    light: {
        text: {
            primary: "#1e293b",
            secondary: "#64748b",
            muted: "#94a3b8",
        },
        background: {
            default: "#f8fafc",
            card: "#ffffff",
            input: "rgba(238, 238, 238, 0.42)",
        },
        border: {
            main: "#e2e8f0",
            light: "#f1f5f9",
            focus: "#a9c3ff",
        },
        chip: {
            background: "rgba(15, 181, 174, 0.12)",
            text: "#0fb5ae",
            border: "transparent",
        },
    },
    dark: {
        text: {
            primary: "#f8fafc",
            secondary: "#cbd5e1",
            muted: "#94a3b8",
        },
        background: {
            default: "#0f172a",
            card: "#1e293b",
            input: "rgba(30, 41,59, 1)",
        },
        border: {
            main: "#334155",
            light: "#1e293b",
            focus: "#60a5fa",
        },
        chip: {
            background: "rgba(15, 181, 174, 0.15)",
            text: "#2dd4bf",
            border: "transparent",
        },
    },
};

const spacing = {
    space1: "0.25rem",
    space2: "0.5rem",
    space3: "0.75rem",
    space4: "1rem",
    space5: "1.25rem",
    space6: "1.5rem",
    space8: "2rem",
    space10: "2.5rem",
    space12: "3rem",
    space16: "4rem",
};

const borderRadius = {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.625rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
};

const customShadows = {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
};

const customTransitions = {
    fast: "0.15s ease",
    base: "0.2s ease",
    slow: "0.3s ease",
};

export const getTheme = (mode: PaletteMode) => {
    const isDark = mode === "dark";
    const modeTokens = isDark ? tokens.dark : tokens.light;

    return createTheme({
        palette: {
            mode,
            primary: {
                main: tokens.colors.primary.main,
                light: isDark ? tokens.colors.primary.lightDark : tokens.colors.primary.light,
                dark: tokens.colors.primary.hover,
                contrastText: "#134e4a",
            },
            secondary: {
                main: tokens.colors.blue.main,
                light: tokens.colors.blue.light,
            },
            error: {
                main: tokens.colors.error,
            },
            warning: {
                main: tokens.colors.warning.main,
                light: isDark ? tokens.colors.warning.lightDark : tokens.colors.warning.light,
            },
            success: {
                main: tokens.colors.success.main,
                light: isDark ? tokens.colors.success.lightDark : tokens.colors.success.light,
            },
            text: {
                primary: modeTokens.text.primary,
                secondary: modeTokens.text.secondary,
                muted: modeTokens.text.muted,
            },
            background: {
                default: modeTokens.background.default,
                paper: modeTokens.background.card,
                card: modeTokens.background.card,
                input: modeTokens.background.input,
            },
            border: {
                main: modeTokens.border.main,
                light: modeTokens.border.light,
                focus: modeTokens.border.focus,
            },
            chip: {
                background: modeTokens.chip.background,
                text: modeTokens.chip.text,
                border: modeTokens.chip.border,
            },
        },
        typography: {
            fontFamily: '"Inter", "Poppins", sans-serif',
            // Font sizes matching CSS variables
            fontSize: 14, // base
            h1: { fontSize: "1.75rem", fontWeight: 700 }, // font-3xl
            h2: { fontSize: "1.5rem", fontWeight: 700 }, // font-2xl
            h3: { fontSize: "1.25rem", fontWeight: 600 }, // font-xl
            h4: { fontSize: "1.125rem", fontWeight: 600 }, // font-lg
            h5: { fontSize: "1rem", fontWeight: 600 }, // font-md
            h6: { fontSize: "0.875rem", fontWeight: 600 }, // font-base
            body1: { fontSize: "0.875rem", fontWeight: 400 }, // font-base
            body2: { fontSize: "0.75rem", fontWeight: 400 }, // font-sm
            caption: { fontSize: "0.6875rem", fontWeight: 400 }, // font-xs
            button: { textTransform: "none", fontWeight: 600 },
        },
        customSpacing: spacing,
        borderRadius,
        customShadows,
        customTransitions,
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    "*": {
                        fontFamily: '"Inter", "Poppins", sans-serif',
                        boxSizing: "border-box",
                    },
                    "p, h1, h2, h3, h4": {
                        margin: 0,
                    },
                    body: {
                        margin: 0,
                        background: modeTokens.background.default,
                        color: modeTokens.text.primary,
                        minHeight: "100vh",
                        position: "relative",
                    },
                    // Radial gradient background effect
                    "body::before": {
                        content: '""',
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: isDark
                            ? `radial-gradient(ellipse 80% 50% at 20% 40%, rgba(15, 181, 174, 0.15), transparent),
                 radial-gradient(ellipse 60% 60% at 80% 20%, rgba(33, 92, 229, 0.12), transparent),
                 radial-gradient(ellipse 50% 50% at 60% 80%, rgba(139, 92, 246, 0.08), transparent)`
                            : `radial-gradient(ellipse 80% 50% at 20% 40%, rgba(15, 181, 174, 0.08), transparent),
                 radial-gradient(ellipse 60% 60% at 80% 20%, rgba(33, 92, 229, 0.06), transparent),
                 radial-gradient(ellipse 50% 50% at 60% 80%, rgba(139, 92, 246, 0.04), transparent)`,
                        pointerEvents: "none",
                        zIndex: -1,
                    },
                    "button, input, select": {
                        transition: "all 0.2s ease",
                    },
                    ":focus-visible": {
                        outline: `2px solid ${tokens.colors.primary.main}`,
                        outlineOffset: "2px",
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 600,
                    },
                    contained: {
                        boxShadow: customShadows.md,
                        "&:hover": {
                            boxShadow: "0 4px 12px rgba(15, 181, 174, 0.3)",
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                    },
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    paper: {
                        backgroundColor: modeTokens.background.card,
                        color: modeTokens.text.primary,
                        border: `1px solid ${modeTokens.border.main}`,
                        boxShadow: customShadows.lg,
                    },
                    option: {
                        color: modeTokens.text.primary,
                        '&[aria-selected="true"]': {
                            backgroundColor: `${isDark ? tokens.colors.primary.lightDark : tokens.colors.primary.light} !important`,
                        },
                        "&.Mui-focused": {
                            backgroundColor: `${isDark ? tokens.colors.primary.lightDark : tokens.colors.primary.light} !important`,
                        },
                    },
                },
            },
        },
    });
};

export type AppTheme = ReturnType<typeof getTheme>;
