import { createReply } from "@/apis/system/BbsReply";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { BbsReplyRequest } from "@/models/system/BbsReply";

function useCreateBbsReplyMutation() {
  return useReactMutation((bbsReplyRequest: BbsReplyRequest) => {
    return createReply(bbsReplyRequest);
  });
}

export { useCreateBbsReplyMutation };
