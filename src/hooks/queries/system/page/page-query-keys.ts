import { PageCondition } from "@/models/system/Page";

export const pageQueryKeys = {
  key: ["page"] as const,
  pages: (condition: PageCondition) => [...pageQueryKeys.key, "pages", condition] as const,
  pageDetail: (pageId: string) => [...pageQueryKeys.key, "page", pageId] as const,
};
