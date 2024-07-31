import { PaletteOptions } from "@mui/material";

export enum BasicColor {
  Primary = "#2D9BB2",
  Secondary = "#554596",
  Dark = "#1f1f1f",
  Red = "#f94b50",
  Yellow = "#FF9322",
  Green = "#00806A",
}

export enum FontColor {
  Primary700 = "#0b3e63",
  Primary = "#2D9BB2",
  Default = "#1f1f1f",
  Gray600 = "#b1b1b1",
  Gray500 = "#CCCCCC",
  Gray400 = "#5b5c5b",
  Gray300 = "#6e706f",
  Gray200 = "#979998",
  Gray100 = "#A7A6A2",
  White = "#FFFFFF",
  HighLight = "#00B4CB",
}

export enum BgColor {
  White300 = "#F1EFEB",
  White200 = "#F5F5F5",
  White100 = "#F2F2F2",
  White50 = "#F8F8F8",
  White = "#FFFFFF",
  Gray700 = "#3c3e3d",
  Gray600 = "#D1D1D1",
  Gray300 = "#c1bfbc",
  Gray200 = "#999999",
  Gray100 = "#EEEEEE",
  Gray50 = "#F7F9F8",
  Secondary50 = "#EEEAf8",
  Secondary100 = "#a897df",
  InputBlue50 = "#E8F0FB",
}

export enum BorderColor {
  Primary = "#dde0df",
  Secondary = "#333333",
  Form = "#b9bcbb",
  Third = "#135678",
}

export enum LineColor {
  Primary = "#EAEAEA",
  Secondary = "#D4D3D3",
}

export enum ButtonColor {
  Primary = "#3ec2cf",
  Secondary = "#666666",
  Red = "#a40033",
}

export const basicPalette: PaletteOptions = {
  primary: {
    main: BasicColor.Primary,
  },
};
