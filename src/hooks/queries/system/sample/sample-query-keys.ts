import { BbsCondition } from "@/models/system/Bbs";

export const SampleQueryKeys = {
  key: ["sample"] as const,
  bbsPosts: (bbsCondition: BbsCondition) => [...SampleQueryKeys.key, "bbsPosts", bbsCondition] as const,
  mailTemplates: (templateType: string) => [...SampleQueryKeys.key, "mailTemplates", templateType] as const,
  mailBatchTest: () => [...SampleQueryKeys.key, "mailBatchTest"] as const,
};
