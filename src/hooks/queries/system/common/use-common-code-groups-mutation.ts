import { useReactMutation } from "@/hooks/use-react-mutation";
import { setCommonCodeGroups } from "@/apis/system/CommonCode";
import { CommonCodeGroup } from "@/models/system/CommonCode";

export const useCommonCodeGroupsMutation = () => {
  return useReactMutation((codeGroups: CommonCodeGroup[]) => {
    return setCommonCodeGroups(codeGroups);
  });
};
