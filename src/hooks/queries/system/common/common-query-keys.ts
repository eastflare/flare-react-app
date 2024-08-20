import { CommonCodeCondition } from "@/models/common/CommonCode";
import { CommonCodeSearchParams } from "./use-common-code-groups-query";

export const CommonQueryKeys = {
  key: ["common"] as const,
  commonCodeNames: (commonGroupCode: string) => [...CommonQueryKeys.key, "commonCodeNames", commonGroupCode] as const,
  commonCodeGroups: ({ cmnGrCd, cmnCd, useYn }: CommonCodeSearchParams) => [...CommonQueryKeys.key, "commonCodeGroups", { cmnGrCd, cmnCd, useYn }] as const,
  commonCode: (cmnGrCd: string) => [...CommonQueryKeys.key, "commonCode", cmnGrCd] as const,
  commonCodeHeader: (cmnGrCd: string) => [...CommonQueryKeys.key, "commonCodeHeader", cmnGrCd] as const,
  commonCodeNamesCondition: (condition: CommonCodeCondition) => [...CommonQueryKeys.key, "commonCodeNamesCondition", condition] as const,
};
