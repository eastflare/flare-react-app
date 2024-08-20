import { useReactMutation } from '@/hooks/use-react-mutation';
import { setCommonCodes } from '@/apis/system/CommonCode';
import { CommonCode } from '@/models/system/CommonCode';

export const useCommonCodesMutation = () => {
  return useReactMutation((commonCodes: CommonCode[]) => {
    return setCommonCodes(commonCodes);
  });
};