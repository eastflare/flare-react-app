import { useReactQuery } from "@/hooks/use-react-query";
import { MessageQueryKeys } from "./message-query-keys";
import { MessageCondition } from "@/models/system/Message";
import { findMessages } from "@/apis/system/Message";

export const useMessagesQuery = (condition: MessageCondition, enabled?: boolean) => {
  return useReactQuery({
    queryKey: MessageQueryKeys.messages(condition),
    queryFn: () => {
      return findMessages(condition);
    },
    enabled: enabled,
  });
};
