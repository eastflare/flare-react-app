import { devLogin } from "@/apis/Session";
import { useReactMutation } from "@/hooks/use-react-mutation";

type LoginParams = {
  userId: string;
  langCd: string;
};

function useLoginMutation() {
  return useReactMutation(({ userId, langCd }: LoginParams) => {
    return devLogin(userId, langCd);
  });
}

export { useLoginMutation };
