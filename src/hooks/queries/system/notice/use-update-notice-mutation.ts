import { modifyNotice } from "@/apis/system/Notice";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { NoticePostUpdateRequest } from "@/models/system/Notice";

function useUpdateNoticeMutation() {
  return useReactMutation((notice: NoticePostUpdateRequest) => {
    return modifyNotice(notice);
  });
}

export { useUpdateNoticeMutation };
