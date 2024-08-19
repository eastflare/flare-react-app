import { PageCondition } from "@/models/admin/Page";

export const pageQueryKeys = {
  key: ["page"] as const,
  pages: ({ pageId, pageNm, pageUrl, useYn }: PageCondition) => [...pageQueryKeys.key, "pages", { pageId, pageNm, pageUrl, useYn }] as const,
};
