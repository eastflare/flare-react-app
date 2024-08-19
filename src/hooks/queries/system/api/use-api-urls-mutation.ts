import { useReactMutation } from "@/hooks/use-react-mutation";
import { saveApiUrls } from "@/apis/system/ApiUrl";
import { ApiUrl } from "@/models/system/ApiUrl";

export const useApiUrlsMutation = () => {
  return useReactMutation((apiUrls: ApiUrl[]) => {
    return saveApiUrls(apiUrls);
  });
};
