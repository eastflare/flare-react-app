import { useReactQuery } from "@/hooks/use-react-query";
import { NoticeCondition } from "@/models/system/Notice";
import { BbsQueryKeys } from "./bbs-query-keys";
import { findBbsPosts } from "@/apis/system/Bbs";

function useBbsPostsQuery(condition: NoticeCondition = {}) {
  return useReactQuery({
    queryKey: BbsQueryKeys.bbsPosts(condition),
    queryFn: () => {
      return findBbsPosts(condition);
    },
  });
}

export { useBbsPostsQuery };
