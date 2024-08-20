import { removeReply } from "@/apis/system/BbsReply";
import { useReactMutation } from "@/hooks/use-react-mutation";

function useDeleteBbsReplyMutation() {
  return useReactMutation(({ bbmNo, bbmReNo }: { bbmNo: string; bbmReNo: string }) => {
    return removeReply(bbmNo, bbmReNo);
  });
}

export { useDeleteBbsReplyMutation };
