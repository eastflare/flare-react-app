import { useReactQuery } from "@/hooks/use-react-query";
import { SampleQueryKeys } from "./sample-query-keys";
import { mailBatchTest } from "@/apis/system/Mail";

export const useMailBatchTestQuery = () => {
  return useReactQuery({
    queryKey: SampleQueryKeys.mailBatchTest(),
    queryFn: () => {
      return mailBatchTest();
    },
    enabled: false,
  });
};
