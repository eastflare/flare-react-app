import { $semantic } from "/ui";
import { ColorPartial as MuiColorPartial, PaletteColor as MuiPaletteColor } from "@mui/material/styles/createPalette";

type SemanticColor = typeof $semantic.light;

declare module "@mui/material" {
  interface ColorPartial extends MuiColorPartial {
    350?: string;
    750?: string;
    850?: string;
  }

  interface Palette {
    semantic: SemanticColor;
    normal: Palette["primary"];
    esgrey: ColorPartial;
    confirmed: ColorPartial;
    warningMinor: ColorPartial;
    warningMajor: ColorPartial;
    done: ColorPartial;
    offline: ColorPartial;
    deepblue: ColorPartial;
    lime: ColorPartial;
    pink: ColorPartial;
    lightblue: ColorPartial;
  }

  interface PaletteColor extends MuiPaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    350?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    750?: string;
    800?: string;
    850?: string;
    900?: string;
  }

  interface PaletteOptions {
    semantic?: SemanticColor;
    normal?: PaletteOptions["primary"];
    esgrey?: ColorPartial;
    confirmed?: ColorPartial;
    warningMinor?: ColorPartial;
    warningMajor?: ColorPartial;
    done?: ColorPartial;
    offline?: ColorPartial;
    deepblue?: ColorPartial;
    lime?: ColorPartial;
    pink?: ColorPartial;
    lightblue?: ColorPartial;
  }
  interface ButtonPropsColorOverrides {
    normal: true;
  }

  interface ButtonPropsVariantOverrides {
    unfilled: true;
    unfilledInverse: true;
  }

  interface TypographyVariants {
    bodyBasic: React.CSSProperties;
    bodyBasicBold: React.CSSProperties;
    bodyXlarge: React.CSSProperties;
    bodyXlargeBold: React.CSSProperties;
    bodyLarge: React.CSSProperties;
    bodyLargeBold: React.CSSProperties;
    bodySmall: React.CSSProperties;
    bodySmallBold: React.CSSProperties;
    bodyXsmall: React.CSSProperties;
    bodyXsmallBold: React.CSSProperties;

    headerArea1LevelMenu: React.CSSProperties;
    sysNameFull: React.CSSProperties;
    headerAreaSysNameFull: React.CSSProperties;
    headerAreaUtilMenu: React.CSSProperties;

    leftArea1LevelMenu: React.CSSProperties;
    leftArea2LevelMenu: React.CSSProperties;
    leftArea2LevelMenuSelected: React.CSSProperties;
    leftArea3LevelMenu: React.CSSProperties;
    leftArea3LevelMenuSelected: React.CSSProperties;

    imageLinkTitleText: React.CSSProperties;
    imageLinkSubText: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    bodyBasic?: React.CSSProperties;
    bodyBasicBold?: React.CSSProperties;
    bodyXlarge?: React.CSSProperties;
    bodyXlargeBold?: React.CSSProperties;
    bodyLarge?: React.CSSProperties;
    bodyLargeBold?: React.CSSProperties;
    bodySmall?: React.CSSProperties;
    bodySmallBold?: React.CSSProperties;
    bodyXsmall?: React.CSSProperties;
    bodyXsmallBold?: React.CSSProperties;

    headerArea1LevelMenu?: React.CSSProperties;
    sysNameFull?: React.CSSProperties;
    headerAreaSysNameFull?: React.CSSProperties;
    headerAreaUtilMenu?: React.CSSProperties;

    leftArea1LevelMenu?: React.CSSProperties;
    leftArea2LevelMenu?: React.CSSProperties;
    leftArea2LevelMenuSelected?: React.CSSProperties;
    leftArea3LevelMenu?: React.CSSProperties;
    leftArea3LevelMenuSelected?: React.CSSProperties;

    imageLinkTitleText?: React.CSSProperties;
    imageLinkSubText?: React.CSSProperties;
  }

  interface TypographyPropsVariantOverrides {
    bodyBasic: true;
    bodyBasicBold: true;
    bodyXlarge: true;
    bodyXlargeBold: true;
    bodyLarge: true;
    bodyLargeBold: true;
    bodySmall: true;
    bodySmallBold: true;
    bodyXsmall: true;
    bodyXsmallBold: true;

    headerArea1LevelMenu: true;
    sysNameFull: true;
    headerAreaSysNameFull: true;
    headerAreaUtilMenu: true;

    leftArea1LevelMenu: true;
    leftArea2LevelMenu: true;
    leftArea2LevelMenuSelected: true;
    leftArea3LevelMenu: true;
    leftArea3LevelMenuSelected: true;

    imageLinkTitleText: true;
    imageLinkSubText: true;
  }
}
