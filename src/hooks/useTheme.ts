import { useTheme as muiUseTheme } from "@mui/material";
import { ToggleThemeOptions } from "ui/theme/theme-switch-provider";

export const useTheme = () => {
  // 구현 내용
  return [muiUseTheme(), (toggleThemeOptions?: ToggleThemeOptions) => {}] as const;
};
