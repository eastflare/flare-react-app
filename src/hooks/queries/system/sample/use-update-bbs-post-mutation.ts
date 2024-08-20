import { useReactMutation } from "@/hooks/use-react-mutation";
import { updateBbsPost } from "@/apis/sample/BbsApi.ts";
import { BbsPostDetail } from "@/models/system/Bbs";

export const useUpdateBbsPostMutation = () => {
  return useReactMutation((bbs: BbsPostDetail) => {
    return updateBbsPost(bbs);
  }, {});
};
