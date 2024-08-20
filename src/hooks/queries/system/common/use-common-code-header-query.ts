import { useReactQuery } from "@/hooks/use-react-query";
import { getCommonCodeHeader } from "@/apis/system/CommonCode";
import { CommonQueryKeys } from "@/hooks/queries/system/common/common-query-keys";

export const useCommonCodeHeaderQuery = (cmnGrCd: string) => {
  return useReactQuery({
    queryKey: CommonQueryKeys.commonCodeHeader(cmnGrCd),
    queryFn: () => {
      return getCommonCodeHeader(cmnGrCd);
    },
  });
};
