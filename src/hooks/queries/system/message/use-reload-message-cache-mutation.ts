import { reloadMessages } from "@/apis/system/Message";
import { useReactMutation } from "@/hooks/use-react-mutation";

export const useReloadMessageCacheMutation = () => {
  return useReactMutation(() => {
    return reloadMessages();
  });
};
