import { useReactQuery } from "@/hooks/use-react-query";
import { findApiUrls } from "@/apis/system/ApiUrl";
import { ApiQueryKeys } from "@/hooks/queries/system/api/api-query-keys";
import { ApiUrlCondition } from "@/models/system/ApiUrl";

export const useApiUrlsQuery = ({ apiNm, apiUrl, useYn }: ApiUrlCondition) => {
  return useReactQuery({
    queryKey: ApiQueryKeys.apiUrls({ apiNm, apiUrl, useYn }),
    queryFn: () => {
      return findApiUrls({ apiNm, apiUrl, useYn });
    },
  });
};
