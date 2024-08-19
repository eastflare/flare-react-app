import { useReactQuery } from "@/hooks/use-react-query";
import { findPages } from "@/apis/system/Page";
import { pageQueryKeys } from "@/hooks/queries/system/page/page-query-keys";
import { PageCondition } from "@/models/system/Page";

export const usePagesQuery = ({ pageId, pageNm, pageUrl, useYn }: PageCondition) => {
  return useReactQuery({
    queryKey: pageQueryKeys.pages({ pageId, pageNm, pageUrl, useYn }),
    queryFn: () => {
      return findPages({ pageId, pageNm, pageUrl, useYn });
    },
  });
};
