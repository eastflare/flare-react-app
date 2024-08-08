import { ApiUrlCondition } from "@/models/admin/ApiUrl";

export const ApiQueryKeys = {
  key: ["api"] as const,
  apiUrls: ({ apiNm, apiUrl, useYn }: ApiUrlCondition) => [...ApiQueryKeys.key, "apiUrls", { apiNm, apiUrl, useYn }] as const,
};
