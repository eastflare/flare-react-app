import { modifyReply } from "@/apis/system/BbsReply";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { BbsReplyUpdateRequest } from "@/models/system/BbsReply";

function useUpdateBbsReplyMutation() {
  return useReactMutation((bbsReplyUpdateRequest: BbsReplyUpdateRequest) => {
    return modifyReply(bbsReplyUpdateRequest);
  });
}

export { useUpdateBbsReplyMutation };
