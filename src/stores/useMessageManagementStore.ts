import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { GridApi, IRowNode } from "ag-grid-community";
import _ from "lodash";

import { getCommonCodeNames } from "apis/system/CommonCode";
import { findMessages, saveMessages } from "apis/system/Message";
import { Message, MessageCondition, ShowingMessage } from "@/models/system/Message";
import { CommonYN } from "@/models/common/Common";
import { Nullable } from "@/models/common/FalsyGeneric";
import { translate as t } from "utils/i18nUtil";
import { Code, commonYNList } from "@/models/common/CommonCode";
import { CrudCode } from "@/models/common/Edit";

interface MessageManagementState {
  messages: Message[];
  showingMessages: ShowingMessage[];
  lastSearchedCondition: MessageCondition;
  messageManagementGridApi: Nullable<GridApi>;
  languageCodes: Code[];
  useYnCodes: Code[];
  initMessagePage: () => void;
  resetMessagePage: () => void;
  setMessageManagementGridApi: (gridApi: GridApi) => void;
  findMessages: (messageCondition: MessageCondition) => void;
  findMessagesWithLastSearchedCondition: () => void;
  addMessage: () => void;
  removeMessages: () => Promise<string | undefined>;
  saveMessages: () => Promise<string | undefined>;
}

const convertMessagesToShowingMessages = (messages: Message[], languageCodes: Code[]): ShowingMessage[] => {
  if (messages.length === 0 || languageCodes.length === 0) {
    return [];
  }

  const uniqueMsgCtn = [
    ...messages
      .filter(msgCtn => msgCtn !== null)
      .map(message => message.msgCtn as string)
      .filter((msgCtn, index, array) => array.indexOf(msgCtn) === index),
  ];

  const showingMessages: ShowingMessage[] = [];

  for (const msgCtn of uniqueMsgCtn) {
    let showingMessage: ShowingMessage = {
      msgCtn: null,
      msgTxtCtn1: null,
      msgTxtCtn2: null,
      msgTxtCtn3: null,
      msgTxtCtn4: null,
      msgTxtCtn5: null,
      rmk: null,
      optValCtn1: null,
      optValCtn2: null,
      optValCtn3: null,
      useYn: null,
      dataInsUserId: null,
      dataInsUserIp: null,
      dataInsDtm: null,
      dataUpdUserId: null,
      dataUpdUserIp: null,
      dataUpdDtm: null,
    };

    const messagesSelectedByMsgCtn = messages.filter(message => message.msgCtn === msgCtn);

    for (let i = 0; i < languageCodes.length; i++) {
      const languageCode = languageCodes[i].cmnCd ?? "";

      const findMessages = messagesSelectedByMsgCtn.filter(message => message.langCd === languageCode);

      if (findMessages.length !== 0) {
        const { msgTxtCtn, ...rest } = findMessages[0];

        if (showingMessage.msgCtn === null) {
          showingMessage = { ...showingMessage, ...rest };
        }

        (showingMessage as any)[`msgTxtCtn${i + 1}`] = msgTxtCtn;
      }
    }

    showingMessages.push({ ...showingMessage, crudKey: CrudCode.READ, uuid: uuid() });
  }

  return showingMessages;
};

const convertShowingMessagesToMessages = (showingMessages: ShowingMessage[], languageCodes: Code[]): Message[] => {
  const messages: Message[] = [];

  for (const showingMessage of showingMessages) {
    const { ...rest } = showingMessage;

    for (let i = 0; i < languageCodes.length; i++) {
      const languageCode = languageCodes[i].cmnCd ?? "";

      messages.push({
        ...rest,
        langCd: languageCode,
        msgTxtCtn: (showingMessage as any)[`msgTxtCtn${i + 1}`],
      });
    }
  }

  return messages;
};

export const useMessageManagementStore = create<MessageManagementState>((set, get) => {
  return {
    messages: [],
    showingMessages: [],
    lastSearchedCondition: {},
    messageManagementGridApi: null,
    languageCodes: [],
    useYnCodes: [],
    initMessagePage: async () => {
      set({
        messages: [],
        showingMessages: [],
        lastSearchedCondition: {},
        languageCodes: (await getCommonCodeNames("LANG_CD")) ?? [],
        useYnCodes: commonYNList ?? [],
      });
    },
    resetMessagePage: () => {
      set({
        messages: [],
        showingMessages: [],
        lastSearchedCondition: {},
        languageCodes: [],
        useYnCodes: [],
      });
    },
    setMessageManagementGridApi: (gridApi: GridApi) => {
      set({
        messageManagementGridApi: gridApi,
      });
    },
    findMessages: async (messageCondition: MessageCondition) => {
      const { languageCodes } = get();

      const apiResult = (await findMessages(messageCondition)) ?? [];

      set({
        messages: [...apiResult],
        showingMessages: [...convertMessagesToShowingMessages([...apiResult], [...languageCodes])],
        lastSearchedCondition: { ...messageCondition },
      });
    },
    findMessagesWithLastSearchedCondition: async () => {
      const { languageCodes, lastSearchedCondition } = get();

      const apiResult = (await findMessages(lastSearchedCondition)) ?? [];

      set({
        messages: [...apiResult],
        showingMessages: [...convertMessagesToShowingMessages([...apiResult], [...languageCodes])],
      });
    },
    addMessage: () => {
      const { showingMessages } = get();
      set({
        showingMessages: [{ crudKey: CrudCode.CREATE, uuid: uuid(), useYn: CommonYN.Y } as ShowingMessage, ...showingMessages],
      });
    },
    removeMessages: async () => {
      const { messageManagementGridApi, showingMessages, languageCodes, lastSearchedCondition } = get();

      if (messageManagementGridApi === null) {
        return t("__grid api");
      }

      const messageNodesToDelete = messageManagementGridApi.getSelectedNodes() as IRowNode<ShowingMessage>[];

      const createdMessagesToDelete = messageNodesToDelete.filter(messageNode => _.get(messageNode, "data.crudKey") === CrudCode.CREATE).map(messageNode => messageNode.data) as ShowingMessage[];

      const dbMessagesToDelete = messageNodesToDelete.filter(messageNode => _.get(messageNode, "data.crudKey") !== CrudCode.CREATE).map(messageNode => messageNode.data) as ShowingMessage[];

      if (!_.isEmpty(createdMessagesToDelete) && _.isEmpty(dbMessagesToDelete)) {
        messageManagementGridApi.applyTransaction({
          remove: [...createdMessagesToDelete],
        });

        messageManagementGridApi.refreshCells({
          force: true,
          suppressFlash: true,
        });

        set({
          showingMessages: [
            ..._.filter(showingMessages, (message: ShowingMessage) => {
              return _.isEmpty(createdMessagesToDelete.filter(createdMessage => createdMessage.uuid === message.uuid));
            }),
          ],
        });
        return t("__삭제 성공");
      } else if (!_.isEmpty(dbMessagesToDelete)) {
        const uniqueMsgCtnToDelete = _.uniq([...dbMessagesToDelete.map(message => message.msgCtn as string).filter(msgCtn => msgCtn !== null)]);

        const messagesToDelete: Message[] = [];

        for (const msgCtn of uniqueMsgCtnToDelete) {
          for (const languageCode of languageCodes) {
            messagesToDelete.push({
              crudKey: CrudCode.DELETE,
              msgCtn: msgCtn,
              langCd: languageCode.cmnCd,
              msgTxtCtn: CrudCode.DELETE,
            } as Message);
          }
        }

        const saveApiResult = await saveMessages(messagesToDelete);

        if (saveApiResult) {
          const findApiResult = (await findMessages({ ...lastSearchedCondition })) ?? [];
          set({
            messages: [...findApiResult],
            showingMessages: [...convertMessagesToShowingMessages([...findApiResult], [...languageCodes])],
          });

          return t("__삭제 성공");
        } else {
          return t("__fail when delete data api");
        }
      } else {
        return t("__삭제 성공");
      }
    },
    saveMessages: async () => {
      const { messages, showingMessages, languageCodes, lastSearchedCondition } = get();

      const showingMessagesToSave = showingMessages.filter(message => message.crudKey === CrudCode.CREATE || message.crudKey === CrudCode.UPDATE);

      const messagesToSave = convertShowingMessagesToMessages(showingMessagesToSave, languageCodes);

      if (!_.isEmpty(messagesToSave.find(message => _.isEmpty(message.msgCtn) || _.isEmpty(message.msgTxtCtn) || _.isEmpty(message.langCd)))) {
        return t("__저장 불가");
      }

      const saveApiResult = await saveMessages(
        messagesToSave.map(message => {
          if (_.isEmpty(messages.find(apiMessage => apiMessage.langCd === message.langCd && apiMessage.msgCtn === message.msgCtn))) {
            return { ...message, useYn: message.useYn ?? CommonYN.Y, crudKey: CrudCode.CREATE };
          } else {
            return { ...message, useYn: message.useYn ?? CommonYN.Y };
          }
        })
      );

      if (saveApiResult) {
        const findApiResult = (await findMessages({ ...lastSearchedCondition })) ?? [];
        set({
          messages: [...findApiResult],
          showingMessages: [...convertMessagesToShowingMessages([...findApiResult], [...languageCodes])],
        });
        return t("__저장 성공");
      } else {
        return t("__fail when save data api");
      }
    },
  };
});
