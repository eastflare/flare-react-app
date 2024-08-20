import { useReactQuery } from "@/hooks/use-react-query";
import { getNotificationGroups } from "@/apis/system/Notification";
import { NotificationQueryKeys } from "./notification-query-keys";
import { NotificationCondition } from "@/models/system/Notification";

export const useNotificationGroupsQuery = ({ ntdkNm, ntdkId, useYn }: NotificationCondition) => {
  return useReactQuery({
    queryKey: NotificationQueryKeys.notificationGroups({ ntdkNm, ntdkId, useYn }),
    queryFn: () => {
      return getNotificationGroups({ ntdkNm, ntdkId, useYn });
    },
  });
};
