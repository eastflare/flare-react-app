import { createNotice } from "@/apis/system/Notice";
import { useReactMutation } from "@/hooks/use-react-mutation";
import { NoticePostRequest } from "@/models/system/Notice";

function useCreateNoticeMutation() {
  return useReactMutation((notice: NoticePostRequest) => {
    return createNotice(notice);
  });
}

export { useCreateNoticeMutation };
