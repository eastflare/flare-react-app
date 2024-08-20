import { useReactQuery } from '@/hooks/use-react-query';
import { getNotificationGroupUsers } from '@/apis/system/Notification';
import { NotificationQueryKeys } from './notification-query-keys';

export const useNotificationGroupUsersQuery = (ntdkId: string) => {
  return useReactQuery({
    queryKey: NotificationQueryKeys.notificationGroupUsers(ntdkId),
    queryFn: () => {
      return getNotificationGroupUsers(ntdkId);
    },
    enabled: Boolean(ntdkId),
  });
};