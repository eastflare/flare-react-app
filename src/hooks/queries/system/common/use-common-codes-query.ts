import { useReactQuery } from "@/hooks/use-react-query";
import { getCommonCodes } from "@/apis/system/CommonCode";
import { CommonQueryKeys } from "@/hooks/queries/system/common/common-query-keys";
import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { CommonError } from "@/models/common/APIError";
import { CommonResponse } from "@/models/common/RestApi";
import { CommonCode } from "@/models/system/CommonCode";

export const useCommonCodesQuery = (cmnGrCd: string, options?: UseQueryOptions<CommonResponse<CommonCode[]>, CommonError, CommonResponse<CommonCode[]>, QueryKey>) => {
  return useReactQuery({
    queryKey: CommonQueryKeys.commonCode(cmnGrCd),
    queryFn: () => {
      return getCommonCodes(cmnGrCd);
    },
    ...{ options },
  });
};
