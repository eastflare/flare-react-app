import { NotificationCondition } from "@/models/system/Notification";

export const NotificationQueryKeys = {
  key: ["notification"] as const,
  notificationGroups: ({ ntdkNm, ntdkId, useYn }: NotificationCondition) => [...NotificationQueryKeys.key, "notificationGroups", { ntdkNm, ntdkId, useYn }] as const,
  notificationGroupDivisions: () => [...NotificationQueryKeys.key, "notificationGroupDivisions"] as const,
  notificationGroupUsers: (ntdkId: string) => [...NotificationQueryKeys.key, "notificationGroupUsers", ntdkId] as const,
};
