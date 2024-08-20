import { deleteNotice } from "@/apis/system/Notice";
import { useReactMutation } from "@/hooks/use-react-mutation";

function useDeleteNoticeMutation() {
  return useReactMutation((bbmNo: string) => {
    return deleteNotice(bbmNo);
  });
}

export { useDeleteNoticeMutation };
