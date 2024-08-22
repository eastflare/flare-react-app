import { useReactQuery } from "@/hooks/use-react-query";
import { pageQueryKeys } from "./page-query-keys";
import { findPageById } from "@/apis/system/Page";

export const usePageDetailQuery = (pageId: string) => {
  return useReactQuery({
    queryKey: pageQueryKeys.pageDetail(pageId),
    queryFn: () => {
      return findPageById(pageId);
    },
  });
};
