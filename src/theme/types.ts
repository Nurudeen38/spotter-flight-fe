import "@mui/material/styles";

declare module "@mui/material/styles" {
    interface CustomSpacing {
        space1: string;
        space2: string;
        space3: string;
        space4: string;
        space5: string;
        space6: string;
        space8: string;
        space10: string;
        space12: string;
        space16: string;
    }

    interface CustomBorderRadius {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
        full: string;
    }

    interface CustomShadows {
        sm: string;
        md: string;
        lg: string;
    }

    interface CustomTransitions {
        fast: string;
        base: string;
        slow: string;
    }

    interface TypeText {
        muted: string;
    }

    interface TypeBackground {
        card: string;
        input: string;
    }

    interface Palette {
        border: {
            main: string;
            light: string;
            focus: string;
        };
        chip: {
            background: string;
            text: string;
            border: string;
        };
    }

    interface PaletteOptions {
        border?: {
            main?: string;
            light?: string;
            focus?: string;
        };
        chip?: {
            background?: string;
            text?: string;
            border?: string;
        };
    }

    interface Theme {
        customSpacing: CustomSpacing;
        borderRadius: CustomBorderRadius;
        customShadows: CustomShadows;
        customTransitions: CustomTransitions;
    }

    interface ThemeOptions {
        customSpacing?: Partial<CustomSpacing>;
        borderRadius?: Partial<CustomBorderRadius>;
        customShadows?: Partial<CustomShadows>;
        customTransitions?: Partial<CustomTransitions>;
    }
}

export { };
