import { createBbs } from "@/apis/system/Bbs";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { BbsPostRequest } from "@/models/system/Bbs";

function useCreateBbsMutation() {
  return useReactMutation((bbs: BbsPostRequest) => {
    return createBbs(bbs);
  });
}

export { useCreateBbsMutation };
