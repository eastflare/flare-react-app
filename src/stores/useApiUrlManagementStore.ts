import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { GridApi, IRowNode } from "ag-grid-community";

import { findApiUrls, saveApiUrls } from "apis/system/ApiUrl";
import { ApiUrl, ApiUrlCondition, ShowingApiUrl } from "@/models/system/ApiUrl";
import { Nullable } from "@/models/common/FalsyGeneric";
import _ from "lodash";
import { getRoles } from "apis/system/Role";
import { CrudCode } from "@/models/common/Edit";

interface ApiUrlManagementState {
  apiUrls: ApiUrl[];
  showingApiUrls: ShowingApiUrl[];
  roleCds: string[];
  lastSearchedCondition: ApiUrlCondition;
  apiUrlManagementGridApi: Nullable<GridApi>;
  initApiUrlManagementPage: () => void;
  resetApiUrlManagementPage: () => void;
  setApiUrlManagementGridApi: (gridApi: GridApi) => void;
  findApiUrls: (apiUrlCondition: ApiUrlCondition) => void;
  addApiUrl: () => void;
  removeApiUrls: () => Promise<boolean>;
  saveApiUrls: () => Promise<boolean>;
  setShowingUrls: (list: ShowingApiUrl[]) => void;
}

const convertApiUrlsToShowingApiUrls = (apiUrls: ApiUrl[]): ShowingApiUrl[] => {
  if (apiUrls.length === 0) {
    return [];
  }

  const showingApiUrls: ShowingApiUrl[] = [];

  for (const key in apiUrls) {
    showingApiUrls.push({
      ...apiUrls[key],
      no: key,
      crudKey: CrudCode.READ,
      uuid: uuid(),
    });
  }

  return showingApiUrls;
};

export const useApiUrlManagementStore = create<ApiUrlManagementState>((set, get) => {
  return {
    apiUrls: [],
    showingApiUrls: [],
    roleCds: [],
    lastSearchedCondition: {},
    apiUrlManagementGridApi: null,
    initApiUrlManagementPage: async () => {
      const roles = await getRoles("");
      const roleCds = roles ? roles.map(role => role.roleCd) : [];
      set({
        apiUrls: [],
        showingApiUrls: [],
        roleCds: roleCds,
      });
    },
    resetApiUrlManagementPage: () => {
      set({
        apiUrls: [],
        showingApiUrls: [],
        roleCds: [],
      });
    },
    setApiUrlManagementGridApi: (gridApi: GridApi) => {
      set({
        apiUrlManagementGridApi: gridApi,
      });
    },
    findApiUrls: async (apiUrlCondition: ApiUrlCondition) => {
      const apiResult = await findApiUrls(apiUrlCondition);
      set({
        showingApiUrls: convertApiUrlsToShowingApiUrls(apiResult),
        lastSearchedCondition: apiUrlCondition,
      });
    },
    addApiUrl: () => {
      const { showingApiUrls } = get();
      set({
        showingApiUrls: [
          {
            crudKey: CrudCode.CREATE,
            uuid: uuid(),
            useYn: "Y",
            // apiRoles: ['ADM'],
            httpMthdCd: "GET",
          } as ShowingApiUrl,
          ...showingApiUrls,
        ],
      });
    },
    removeApiUrls: async () => {
      const { apiUrlManagementGridApi, showingApiUrls, lastSearchedCondition } = get();

      if (_.isNull(apiUrlManagementGridApi)) {
        return false;
      }
      const apiUrlNodesToDelete = apiUrlManagementGridApi?.getSelectedNodes() as IRowNode<ShowingApiUrl>[];

      const createdApiUrlsToDelete = apiUrlNodesToDelete.filter(apiUrlNode => _.get(apiUrlNode, "data.crudKey") === CrudCode.CREATE).map(apiUrlNode => apiUrlNode.data) as ShowingApiUrl[];

      const dbApiUrlsToDelete = apiUrlNodesToDelete.filter(apiUrlNode => _.get(apiUrlNode, "data.crudKey") !== CrudCode.CREATE).map(apiUrlNode => apiUrlNode.data) as ShowingApiUrl[];

      if (!_.isEmpty(createdApiUrlsToDelete)) {
        apiUrlManagementGridApi?.applyTransaction({
          remove: [...createdApiUrlsToDelete],
        });

        apiUrlManagementGridApi?.refreshCells({
          force: true,
          suppressFlash: true,
        });

        set({
          showingApiUrls: [
            ..._.filter(showingApiUrls, (apiUrl: ShowingApiUrl) => {
              return _.isEmpty(createdApiUrlsToDelete.filter(createdUrlApi => createdUrlApi.uuid === apiUrl.uuid));
            }),
          ],
        });
      }

      if (!_.isEmpty(dbApiUrlsToDelete)) {
        const apiUrlsToDelete: ApiUrl[] = [];

        for (const apiUrl of dbApiUrlsToDelete) {
          apiUrlsToDelete.push({
            ...apiUrl,
            crudKey: CrudCode.DELETE,
          } as ApiUrl);
        }

        const result = await saveApiUrls(apiUrlsToDelete);

        if (result) {
          const newApiUrls = (await findApiUrls({ ...lastSearchedCondition })) ?? [];
          set({
            apiUrls: [...newApiUrls],
            showingApiUrls: [...convertApiUrlsToShowingApiUrls(newApiUrls)],
          });
        } else {
          return false;
        }
      }

      return true;
    },
    saveApiUrls: async () => {
      const { showingApiUrls, lastSearchedCondition } = get();

      const apiUrlsToSave = showingApiUrls.filter(apiUrl => apiUrl.crudKey === CrudCode.CREATE || apiUrl.crudKey === CrudCode.UPDATE);

      const invaildApiUrls = apiUrlsToSave.filter(apiUrl => apiUrl.apiId === null || apiUrl.apiId === undefined || apiUrl.apiId === "");
      if (invaildApiUrls.length > 0) {
        return false;
      }

      const result = await saveApiUrls(apiUrlsToSave);

      if (result) {
        const newApiUrls = (await findApiUrls({ ...lastSearchedCondition })) ?? [];
        set({
          apiUrls: [...newApiUrls],
          showingApiUrls: [...convertApiUrlsToShowingApiUrls([...newApiUrls])],
        });
        return true;
      }
      return false;
    },
    setShowingUrls: (list: ShowingApiUrl[]) => {
      set({
        showingApiUrls: list,
      });
    },
  };
});
