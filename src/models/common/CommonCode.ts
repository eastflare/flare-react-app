export interface Code {
  cmnCd?: string;
  cmnCdNm?: string;
  cmnCdDesc?: string;
  upprCmnCd?: string;
  copCd?: string;
}

export const commonYNList: Code[] = [
  { cmnCd: "Y", cmnCdNm: "사용" },
  { cmnCd: "N", cmnCdNm: "미사용" },
];

export interface CommonCodeCondition {
  cmnGrCd: string;
  optValCtn1?: string;
  optValCtn2?: string;
  optValCtn3?: string;
  optValCtn4?: string;
  optValCtn5?: string;
  optValCtn6?: string;
  optValCtn7?: string;
  optValCtn8?: string;
  optValCtn9?: string;
  optValCtn10?: string;
  optValCtn11?: string;
  optValCtn12?: string;
  optValCtn13?: string;
  optValCtn14?: string;
  optValCtn15?: string;
}
