import { useReactMutation } from "@/hooks/use-react-mutation";
import { savePages } from "@/apis/admin/Page";
import { Page } from "@/models/admin/Page";

export const usePagesMutation = () => {
  return useReactMutation((apiUrls: Page[]) => {
    return savePages(apiUrls);
  });
};
