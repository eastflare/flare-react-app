import { useReactMutation } from '@/hooks/use-react-mutation';
import { saveMessages } from '@/apis/system/Message';
import { Message } from '@/models/system/Message';

export const useSaveMessagesMutate = () => {
  return useReactMutation((messages: Message[]) => {
    return saveMessages(messages);
  });
};