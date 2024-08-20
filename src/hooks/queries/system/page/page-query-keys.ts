import { PageCondition } from "@/models/system/Page";

export const pageQueryKeys = {
  key: ["page"] as const,
  pages: ({ pageId, pageNm, pageUrl, ruteUrl, useYn }: PageCondition) => [...pageQueryKeys.key, "pages", { pageId, pageNm, pageUrl, ruteUrl, useYn }] as const,
};
