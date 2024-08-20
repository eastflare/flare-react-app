import { useReactQuery } from "@/hooks/use-react-query";
import { SampleQueryKeys } from "./sample-query-keys";
import { getMailTemplate } from "@/apis/system/Mail";

export const useMailTemplatesQuery = (templateType: string) => {
  return useReactQuery({
    queryKey: SampleQueryKeys.mailTemplates(templateType),
    queryFn: () => {
      return getMailTemplate(templateType);
    },
    enabled: false,
  });
};
