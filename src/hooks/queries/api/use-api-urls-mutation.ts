import { useReactMutation } from "@/hooks/use-react-mutation";
import { saveApiUrls } from "@/apis/admin/ApiUrl";
import { ApiUrl } from "@/models/admin/ApiUrl";

export const useApiUrlsMutation = () => {
  return useReactMutation((apiUrls: ApiUrl[]) => {
    return saveApiUrls(apiUrls);
  });
};
