import { useReactQuery } from "@/hooks/use-react-query";
import { MessageQueryKeys } from "./message-query-keys";
import { deployTranslatedMessages } from "@/apis/system/TranslatedMessage";

export const useDeployTranslatedMessagesQuery = (enabled = false) => {
  return useReactQuery({
    queryKey: MessageQueryKeys.deployTranslatedMessages(),
    queryFn: () => {
      return deployTranslatedMessages();
    },
    enabled: enabled,
  });
};
