// import { CommonDialog } from '@/models/common/Dialog';
// import { useCommonDialogAction } from '@stores/common/CommonDialogStore';
// import { useLoadingAction } from '@stores/common/LoadingStore';
// import { ReactComponent as warningIcon } from '@assets/images/icon/ic_warning.svg';
import { ErrorResponse } from "@/models/common/APIError";

import {
  // QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

// React Query Custom Hook으로 전역으로 설정할 옵션을 정의 한다.
export const useReactQuery = <TQueryFnData = unknown, TError = ErrorResponse, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<TData, TError> => {
  const result = useQuery(options);

  const {
    isError,
    // 아래 속성들은 필요에 따라 react query 문서 참고하여 필요시 사용
    // dataUpdatedAt,
    // error,
    // errorUpdateCount,
    // errorUpdatedAt,
    // failureCount,
    // failureReason,
    // fetchStatus,
    // isFetched,
    // isFetchedAfterMount,
    // isFetching,
    // isInitialLoading,
    // isLoading,
    // isLoadingError,
    // isPaused,
    // isPlaceholderData,
    // isPreviousData,
    // isRefetchError,
    // isRefetching,
    // isStale,
    // isSuccess,
    // refetch,
    // remove,
    // status,
  } = result;

  if (isError) {
    console.log("ERROR OCCURED");
  }

  return result;
};
