import { ThemeMode } from "ui/theme/theme";
import { PropsWithChildren } from "react";
import { Theme } from "@mui/material";

export type ToggleThemeOptions = {
    resetToSystem?: boolean;
};
export type ThemeSwitchInitialProps = PropsWithChildren<{
    initialThemeMode?: ThemeMode;
}>;
export type ThemeSwitchProps = {
    theme: Theme;
    toggleTheme: (toggleThemeOptions?: ToggleThemeOptions) => void;
};
export declare const ThemeSwitchContext: import("react").Context<ThemeSwitchProps>;
export declare const ThemeSwitchProvider: ({ initialThemeMode, children }: ThemeSwitchInitialProps) => import("react/jsx-runtime").JSX.Element;
