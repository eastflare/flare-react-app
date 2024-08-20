import { NoticeCondition } from "@/models/system/Notice";

export const NoticeQueryKeys = {
  key: ["notice"] as const,
  noticePosts: (condition: NoticeCondition) => [...NoticeQueryKeys.key, "noticePosts", condition] as const,
  noticePost: (bbmNo: string) => [...NoticeQueryKeys.key, "noticePost", bbmNo] as const,
  noticePopupPost: () => [...NoticeQueryKeys.key, "noticePopupPost"] as const,
};
