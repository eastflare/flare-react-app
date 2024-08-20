import { MessageCondition } from "@/models/system/Message";

export const MessageQueryKeys = {
  key: ["message"] as const,
  messages: (condition: MessageCondition) => [...MessageQueryKeys.key, "messages", condition] as const,
  messagesMsgCtn: (condition: MessageCondition) => [...MessageQueryKeys.key, "messagesMsgCtn", condition] as const,
  deployTranslatedMessages: () => [...MessageQueryKeys.key, "deployTranslatedMessages"] as const,
};
