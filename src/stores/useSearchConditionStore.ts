import dayjs from "dayjs";
import { IfLogRequest } from "models/admin/IfLog";
import { create } from "zustand";

interface SearchConditionState {
  // 화면 검색조건
  mySearchCondition: IfLogRequest;
  setMySearchCondition: (condition: IfLogRequest) => void;
}

export const useSearchConditionStore = create<SearchConditionState>(set => {
  return {
    mySearchCondition: {
      ifLogDtmFr: dayjs().format("YYYYMMDD"),
      ifLogDtmTo: dayjs().format("YYYYMMDD"),
      searchItem: "searchText",
      pageSize: "10",
      start: "0",
      pageNo: "1",
      isFold: "Y",
    },
    setMySearchCondition: (condition: IfLogRequest) => {
      set({ mySearchCondition: condition });
    },
  };
});
