// import { CommonDialog } from '@/models/common/Dialog';
// import { useCommonDialogAction } from '@stores/common/CommonDialogStore';
// import { useLoadingAction } from '@stores/common/LoadingStore';
// import { ReactComponent as warningIcon } from '@assets/images/icon/ic_warning.svg';
import { ErrorResponse } from "@/models/common/APIError";

import {
  MutationFunction,
  // QueryFunction,
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

export const useReactMutation = <TData = unknown, TError = ErrorResponse, TVariables = void, TContext = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationKey" | "mutationFn">,
  isLoading = true //loading이 필요 없을 경우에 해당 옵션 false
): UseMutationResult<TData, TError, TVariables, TContext | void> => {
  const tOptions = { ...options };
  //   const { loadingPop, loadingPush } = useLoadingAction();
  //   const { alert } = useCommonDialogAction();
  // const { t } = useTranslation();

  return useMutation({
    mutationFn,
    ...{
      ...tOptions,
      onMutate(variables) {
        //   isLoading && loadingPush();
        isLoading && console.log("loading started");
        tOptions?.onMutate && tOptions?.onMutate(variables);
      },
      onSuccess(data, variables, context) {
        tOptions?.onSuccess && tOptions?.onSuccess(data, variables, context as TContext);
      },
      onError(error, variables, context) {
        // Mutation 사용 시 공통 에러 처리
        // if (isBusinessError) {
        // const errorAlert: CommonDialog = {
        //   size: 'sm',
        //   icon: warningIcon,
        //   content:
        //     (error as { response: { data: { displayMessage: string } } }).response.data
        //       .displayMessage || (t('error:ServerError.message') as string),
        //   confirmBtnName: t('common:btn.confirm') as string,
        // };
        // console.log('BusinessError errorAlert');
        // alert(errorAlert);
        // } else if (isGlobalError) {
        // const errorAlert: CommonDialog = {
        //   size: 'sm',
        //   icon: warningIcon,
        //   content: t('error:ServerError.message') as string,
        //   confirmBtnName: t('common:btn.confirm') as string,
        // };
        // alert(errorAlert);
        //   console.log('GlobalError errorAlert');
        // }
        tOptions?.onError && tOptions?.onError(error, variables, context as TContext);
      },
      onSettled(data, error, variables, context) {
        //   isLoading && loadingPop();
        isLoading && console.log("loading started");
        tOptions?.onSettled && tOptions?.onSettled(data, error, variables, context as TContext);
      },
    },
  });
};
