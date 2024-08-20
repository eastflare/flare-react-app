import { useReactQuery } from '@/hooks/use-react-query';
import { NoticeQueryKeys } from './notice-query-keys';
import { findNoticePost } from '@/apis/system/Notice';

function useNoticePostQuery(bbmNo: string) {
  return useReactQuery({
    queryKey: NoticeQueryKeys.noticePost(bbmNo),
    queryFn: () => {
      return findNoticePost(bbmNo);
    },
  });
}

export { useNoticePostQuery };