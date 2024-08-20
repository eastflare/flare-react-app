import { BbsCondition } from "@/models/system/Bbs";

export const BbsQueryKeys = {
  key: ["bbs"] as const,
  bbsPosts: (condition: BbsCondition) => [...BbsQueryKeys.key, "bbsPosts", condition] as const,
  bbsPost: (bbmNo: string) => [...BbsQueryKeys.key, "bbsPost", bbmNo] as const,
};
