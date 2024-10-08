import { useReactMutation } from "@/hooks/use-react-mutation";
import { createBbsPost } from "@/apis/sample/BbsApi.ts";
import { BbsPostDetail } from "@/models/system/Bbs";

export const useCreateBbsPostMutation = () => {
  return useReactMutation((bbs: BbsPostDetail) => {
    return createBbsPost(bbs);
  });
};
