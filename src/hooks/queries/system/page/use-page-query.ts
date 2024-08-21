import { useReactQuery } from "@/hooks/use-react-query";
import { findPages } from "@/apis/system/Page";
import { pageQueryKeys } from "@/hooks/queries/system/page/page-query-keys";
import { PageCondition } from "@/models/system/Page";

export const usePagesQuery = (condition: PageCondition) => {
  return useReactQuery({
    queryKey: pageQueryKeys.pages(condition),
    queryFn: () => {
      return findPages(condition);
    },
  });
};
