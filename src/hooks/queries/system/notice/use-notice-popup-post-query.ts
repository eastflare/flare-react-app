import { findNoticePopupPost } from "@/apis/system/Notice";
import { useReactQuery } from "@/hooks/use-react-query";
import { NoticeQueryKeys } from "./notice-query-keys";

function useNoticePopupPostQuery() {
  return useReactQuery({
    queryKey: NoticeQueryKeys.noticePopupPost(),
    queryFn: () => findNoticePopupPost(),
  });
}

export { useNoticePopupPostQuery };
