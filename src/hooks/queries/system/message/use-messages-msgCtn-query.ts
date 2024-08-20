import { useReactQuery } from "@/hooks/use-react-query";
import { MessageQueryKeys } from "./message-query-keys";
import { MessageCondition } from "@/models/system/Message";
import { findMessagesMsgCtn } from "@/apis/system/Message";

export const useMessagesMsgCtnQuery = (condition: MessageCondition, enabled?: boolean) => {
  return useReactQuery({
    queryKey: MessageQueryKeys.messagesMsgCtn(condition),
    queryFn: () => {
      return findMessagesMsgCtn(condition);
    },
    enabled: enabled,
  });
};
