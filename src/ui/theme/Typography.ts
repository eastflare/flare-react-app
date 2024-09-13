import { TypographyOptions } from "@mui/material/styles/createTypography";

const baseTypographyOptions: TypographyOptions = {
  fontFamily: "Spoqa Han Sans Neo",

  h1: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  subtitle1: {
    fontSize: "18px",
    fontWeight: 500,
  },
  subtitle2: {
    fontSize: "18px",
    fontWeight: 400,
  },
  body1: {
    fontSize: "16px",
    fontWeight: 500,
  },
  body2: {
    fontSize: "16px",
    fontWeight: 400,
  },
};
export const typographyOptions: TypographyOptions = {
  ...baseTypographyOptions,
};
