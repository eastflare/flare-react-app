import { useReactQuery } from "@/hooks/use-react-query";
import { getNotificationGroupDivisions } from "@/apis/system/Notification";
import { NotificationQueryKeys } from "./notification-query-keys";

export const useNotificationGroupDivisionsQuery = () => {
  return useReactQuery({
    queryKey: NotificationQueryKeys.notificationGroupDivisions(),
    queryFn: () => {
      return getNotificationGroupDivisions();
    },
  });
};
