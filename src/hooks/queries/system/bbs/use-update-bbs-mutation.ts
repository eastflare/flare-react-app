import { modifyBbs } from "@/apis/system/Bbs";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { BbsPostUpdateRequest } from "@/models/system/Bbs";

function useUpdateBbsMutation() {
  return useReactMutation((bbs: BbsPostUpdateRequest) => {
    return modifyBbs(bbs);
  });
}

export { useUpdateBbsMutation };
