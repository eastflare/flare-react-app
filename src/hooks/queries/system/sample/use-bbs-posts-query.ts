import { useReactQuery } from "@/hooks/use-react-query";
import { SampleQueryKeys } from "./sample-query-keys";
import { BbsCondition } from "@/models/system/Bbs";
import { findBbsPosts } from "@/apis/system/Bbs";

export const useBbsPostsQuery = (bbsCondition: BbsCondition) => {
  return useReactQuery({
    queryKey: SampleQueryKeys.bbsPosts(bbsCondition),
    queryFn: () => {
      return findBbsPosts(bbsCondition);
    },
  });
};
