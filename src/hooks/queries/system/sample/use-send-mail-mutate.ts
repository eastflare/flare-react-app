import { useReactMutation } from '@/hooks/use-react-mutation';
import { sendMail } from '@/apis/system/Mail';
import { MailSendRequest } from '@/models/system/Mail';

export const useSendMailMutate = () => {
  return useReactMutation((emailRequest: MailSendRequest) => {
    return sendMail(emailRequest);
  });
};