import { useReactMutation } from "@/hooks/use-react-mutation";
import { savePages } from "@/apis/system/Page";
import { Page } from "@/models/system/Page";

export const usePagesMutation = () => {
  return useReactMutation((apiUrls: Page[]) => {
    return savePages(apiUrls);
  });
};
