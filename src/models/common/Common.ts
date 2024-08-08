export enum CommonYN {
  Y = "Y",
  N = "N",
}

export interface Option {
  optionName: string;
  optionValue: string;
}

export const commonYNarr: Option[] = [
  { optionName: "Y", optionValue: "Y" },
  { optionName: "N", optionValue: "N" },
];
