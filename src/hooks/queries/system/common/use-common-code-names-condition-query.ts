import { useReactQuery } from "@/hooks/use-react-query";
import { getCommonCodeNamesCondition } from "@/apis/system/CommonCode";
import { CommonQueryKeys } from "./common-query-keys";
import { CommonCodeCondition } from "@/models/common/CommonCode";

export function useCommonCodeNamesConditionQuery(condition: CommonCodeCondition) {
  return useReactQuery({
    queryKey: CommonQueryKeys.commonCodeNamesCondition(condition),
    queryFn: () => {
      return getCommonCodeNamesCondition(condition);
    },
  });
}
