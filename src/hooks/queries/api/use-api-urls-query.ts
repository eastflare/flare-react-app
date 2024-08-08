import { useReactQuery } from "@/hooks/use-react-query";
import { findApiUrls } from "@/apis/admin/ApiUrl";
import { ApiQueryKeys } from "@/hooks/queries/api/api-query-keys";
import { ApiUrlCondition } from "@/models/admin/ApiUrl";

export const useApiUrlsQuery = ({ apiNm, apiUrl, useYn }: ApiUrlCondition) => {
  return useReactQuery({
    queryKey: ApiQueryKeys.apiUrls({ apiNm, apiUrl, useYn }),
    queryFn: () => {
      return findApiUrls({ apiNm, apiUrl, useYn });
    },
  });
};
