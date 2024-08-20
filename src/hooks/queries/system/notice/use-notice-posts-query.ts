import { useReactQuery } from '@/hooks/use-react-query';
import { NoticeCondition } from '@/models/system/Notice';
import { NoticeQueryKeys } from './notice-query-keys';
import { findNoticePosts } from '@/apis/system/Notice';

function useNoticePostsQuery(condition: NoticeCondition = {}) {
  return useReactQuery({
    queryKey: NoticeQueryKeys.noticePosts(condition),
    queryFn: () => {
      return findNoticePosts(condition);
    },
  });
}

export { useNoticePostsQuery };