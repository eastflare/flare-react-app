import { deleteBbs } from "@/apis/system/Bbs";
import { useReactMutation } from "@/hooks/use-react-mutation";

function useDeleteBbsMutation() {
  return useReactMutation((bbmNo: string) => {
    return deleteBbs(bbmNo);
  });
}

export { useDeleteBbsMutation };
