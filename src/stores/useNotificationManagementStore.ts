import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { GridApi, IRowNode } from "ag-grid-community";
import _ from "lodash";

import { getNotificationGroups, getNotificationGroupDivisions, getNotificationGroupUsers, saveNotificationGroups, deleteNotificationGroup, saveNotificationGroupUsers } from "apis/system/Notification";
import { NotificationCondition, NotificationGroup, NotificationGroupDivision, NotificationGroupUser } from "@/models/system/Notification";
import { CommonYN } from "@/models/common/Common";
import { CrudCode } from "@/models/common/Edit";
import { Nullable } from "@/models/common/FalsyGeneric";
import { translate as t } from "utils/i18nUtil";

interface NotificationManagementState {
  notificationGroups: NotificationGroup[];
  notificationGroupDivisions: NotificationGroupDivision[];
  notificationGroupUsers: NotificationGroupUser[];
  deleteTargetnotificationGroupUsers: NotificationGroupUser[];
  lastSearchedCondition: NotificationCondition;
  selectedNotificationGroup: NotificationGroup | null;
  notificationManagementGroupGridApi: Nullable<GridApi>;
  notificationManagementGroupDivisionGridApi: Nullable<GridApi>;
  notificationManagementGroupUserGridApi: Nullable<GridApi>;
  initNotificationManagementPage: () => void;
  setSelectedNoticicationGroup: (notificationGroup: NotificationGroup) => void;
  setNotificationManagementGroupGridApi: (gridApi: GridApi) => void;
  setNotificationManagementGroupDivisionGridApi: (gridApi: GridApi) => void;
  setNotificationManagementGroupUserGridApi: (gridApi: GridApi) => void;
  findNotificationGroups: (notificationCondition: NotificationCondition) => void;
  findNotificationGroupDivisions: () => void;
  findNotificationGroupUsers: (notificationCondition: NotificationCondition) => void;
  addNotificationGroup: () => void;
  addNotificationGroupUser: () => void;
  removeNotificationGroup: () => Promise<string | undefined>;
  removeNotificationGroupUser: () => Promise<string | undefined>;
  saveNotifications: () => Promise<string | undefined>;
}

export const useNotificationManagementStore = create<NotificationManagementState>((set, get) => {
  return {
    notificationGroups: [],
    notificationGroupDivisions: [],
    notificationGroupUsers: [],
    deleteTargetnotificationGroupUsers: [],
    lastSearchedCondition: {},
    selectedNotificationGroup: null,
    notificationManagementGroupGridApi: null,
    notificationManagementGroupDivisionGridApi: null,
    notificationManagementGroupUserGridApi: null,
    initNotificationManagementPage: async () => {
      const { lastSearchedCondition } = get();
      set({
        notificationGroups: (await getNotificationGroups(lastSearchedCondition)) ?? [],
        notificationGroupDivisions: [],
        notificationGroupUsers: [],
        deleteTargetnotificationGroupUsers: [],
        lastSearchedCondition: {},
      });
    },
    setSelectedNoticicationGroup(notificationGroup: NotificationGroup) {
      set({
        selectedNotificationGroup: notificationGroup,
      });
    },
    setNotificationManagementGroupGridApi: (gridApi: GridApi) => {
      set({
        notificationManagementGroupGridApi: gridApi,
      });
    },
    setNotificationManagementGroupDivisionGridApi: (gridApi: GridApi) => {
      set({
        notificationManagementGroupDivisionGridApi: gridApi,
      });
    },
    setNotificationManagementGroupUserGridApi: (gridApi: GridApi) => {
      set({
        notificationManagementGroupUserGridApi: gridApi,
      });
    },
    findNotificationGroups: async (notificationCondition: NotificationCondition) => {
      const apiResult = (await getNotificationGroups(notificationCondition)) ?? [];

      set({
        notificationGroups: apiResult,
        notificationGroupDivisions: [],
        notificationGroupUsers: [],
        deleteTargetnotificationGroupUsers: [],
        lastSearchedCondition: { ...notificationCondition },
      });
    },
    findNotificationGroupDivisions: async () => {
      const apiResult = (await getNotificationGroupDivisions()) ?? [];

      set({
        notificationGroupDivisions: apiResult,
        notificationGroupUsers: [],
        deleteTargetnotificationGroupUsers: [],
      });
    },
    findNotificationGroupUsers: async (notificationCondition: NotificationCondition) => {
      const conditionAsString = JSON.stringify(notificationCondition);
      const apiResult = (await getNotificationGroupUsers(conditionAsString)) ?? [];

      set({
        notificationGroupUsers: apiResult,
        deleteTargetnotificationGroupUsers: [],
        lastSearchedCondition: { ...notificationCondition },
      });
    },
    addNotificationGroup: () => {
      const { notificationGroups } = get();

      set({
        notificationGroups: [{ crudKey: CrudCode.CREATE, uuid: uuid(), useYn: CommonYN.Y } as NotificationGroup, ...notificationGroups],
      });
    },
    addNotificationGroupUser: () => {
      const { notificationGroupUsers } = get();

      set({
        notificationGroupUsers: [{ crudKey: CrudCode.CREATE, uuid: uuid(), useYn: CommonYN.Y } as NotificationGroupUser, ...notificationGroupUsers],
      });
    },
    removeNotificationGroup: async () => {
      const { notificationManagementGroupGridApi, lastSearchedCondition } = get();

      if (notificationManagementGroupGridApi === null) {
        return t("__grid api");
      }

      const notificationGroupNodesToDelete = notificationManagementGroupGridApi.getSelectedNodes() as IRowNode<NotificationGroup>[];

      const createNotificationGroupsToDelete = notificationGroupNodesToDelete
        .filter(notificationGroupNode => _.get(notificationGroupNode, "data.crudKey") === CrudCode.CREATE)
        .map(notificationGroupNode => notificationGroupNode.data)[0] as NotificationGroup;

      const dbNotificationGroupsToDelete = notificationGroupNodesToDelete
        .filter(notificationGroupNode => _.get(notificationGroupNode, "data.crudKey") !== CrudCode.CREATE)
        .map(notificationGroupNode => notificationGroupNode.data)[0] as NotificationGroup;

      if (!_.isEmpty(createNotificationGroupsToDelete)) {
        notificationManagementGroupGridApi.applyTransaction({
          remove: [createNotificationGroupsToDelete],
        });

        const findApiResult = (await getNotificationGroups(lastSearchedCondition)) ?? [];
        set({
          notificationGroups: findApiResult,
        });

        return t("__삭제 성공");
      } else if (!_.isEmpty(dbNotificationGroupsToDelete)) {
        const saveApiResult = await deleteNotificationGroup(JSON.stringify(dbNotificationGroupsToDelete));

        if (saveApiResult) {
          const findApiResult = (await getNotificationGroups(lastSearchedCondition)) ?? [];
          set({
            notificationGroups: findApiResult,
          });

          return t("__삭제 성공");
        } else {
          return t("__fail when delete data api");
        }
      } else {
        return t("__삭제 대상 데이터 없음");
      }
    },
    removeNotificationGroupUser: async () => {
      const { notificationManagementGroupUserGridApi, notificationGroupUsers } = get();

      if (notificationManagementGroupUserGridApi === null) {
        return t("__grid api");
      }

      const notificationGroupUserNodesToDelete = notificationManagementGroupUserGridApi.getSelectedNodes() as IRowNode<NotificationGroupUser>[];

      const createNotificationGroupUsersToDelete = notificationGroupUserNodesToDelete
        .filter(notificationGroupUserNode => _.get(notificationGroupUserNode, "data.crudKey") === CrudCode.CREATE)
        .map(notificationGroupUserNode => notificationGroupUserNode.data) as NotificationGroupUser[];

      const dbNotificationGroupUsersToDelete = notificationGroupUserNodesToDelete
        .filter(notificationGroupUserNode => _.get(notificationGroupUserNode, "data.crudKey") !== CrudCode.CREATE)
        .map(notificationGroupUserNode => {
          return {
            ...notificationGroupUserNode.data,
            crudKey: CrudCode.DELETE,
            uuid: notificationGroupUserNode.data?.uuid,
          };
        }) as NotificationGroupUser[];

      if (!_.isEmpty(createNotificationGroupUsersToDelete)) {
        notificationManagementGroupUserGridApi.applyTransaction({
          remove: [...createNotificationGroupUsersToDelete],
        });
      }
      if (!_.isEmpty(dbNotificationGroupUsersToDelete)) {
        notificationManagementGroupUserGridApi.applyTransaction({
          update: dbNotificationGroupUsersToDelete,
        });
      }

      notificationManagementGroupUserGridApi.refreshCells({
        force: true,
        suppressFlash: true,
      });

      set({
        deleteTargetnotificationGroupUsers: [...dbNotificationGroupUsersToDelete],
        notificationGroupUsers: [
          ..._.filter(notificationGroupUsers, (notificationGroupUser: NotificationGroupUser) => {
            return _.isEmpty(createNotificationGroupUsersToDelete.filter(createdNotificationGroupUser => createdNotificationGroupUser.uuid === notificationGroupUser.uuid));
          }),
        ],
      });
    },
    saveNotifications: async () => {
      const { notificationGroups, notificationGroupUsers, deleteTargetnotificationGroupUsers, lastSearchedCondition } = get();

      const notificationGroupsToSave = notificationGroups.filter(notificationGroup => notificationGroup.crudKey === CrudCode.CREATE || notificationGroup.crudKey === CrudCode.UPDATE);

      for (const notificationGroup of notificationGroupsToSave) {
        if (notificationGroup.ntdkNm === undefined || notificationGroup.ntdkNm === null) {
          return t("__통보처 그룹 이름 없음");
        }
      }

      const notificationGroupUsersToSave = notificationGroupUsers.filter(notificationGroupUser => notificationGroupUser.crudKey === CrudCode.CREATE || notificationGroupUser.crudKey === CrudCode.UPDATE);

      for (const notificationGroupUsers of notificationGroupUsersToSave) {
        if (notificationGroupUsers.aprNotfUserId === undefined || notificationGroupUsers.aprNotfUserId === null) {
          return t("__추가 할 통보처 그룹 유저가 선택되지 않음");
        }
      }

      const notificationGroupUsersToDelete = deleteTargetnotificationGroupUsers.map(notificationGroupUser => {
        return { ...notificationGroupUser, crudKey: CrudCode.DELETE };
      });

      const saveGroupApiResult = await saveNotificationGroups(notificationGroupsToSave);

      if (saveGroupApiResult) {
        const findApiResult = (await getNotificationGroups(lastSearchedCondition)) ?? [];
        set({
          notificationGroups: findApiResult,
        });

        notificationGroupUsersToSave.push(...notificationGroupUsersToDelete);
        const saveGroupNewUserApiResult = await saveNotificationGroupUsers(notificationGroupUsersToSave);
        if (saveGroupNewUserApiResult) {
          const apiResult = (await getNotificationGroupUsers(JSON.stringify(lastSearchedCondition))) ?? [];

          set({
            notificationGroupUsers: apiResult,
          });
          return t("__저장 성공");
        } else {
          return t("__fail when save data api");
        }
      }
    },
  };
});
