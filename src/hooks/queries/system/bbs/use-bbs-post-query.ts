import { useReactQuery } from "@/hooks/use-react-query";
import { BbsQueryKeys } from "./bbs-query-keys";
import { findBbsPost } from "@/apis/system/Bbs";

function useBbsPostQuery(bbmNo: string) {
  return useReactQuery({
    queryKey: BbsQueryKeys.bbsPost(bbmNo),
    queryFn: () => {
      return findBbsPost(bbmNo);
    },
  });
}

export { useBbsPostQuery };
