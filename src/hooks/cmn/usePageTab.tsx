import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import usePageMapStore from "store/pageMapStore";

export type PageTabItem = { id: string; path: string; label: string };
export type PageTabMap = Map<string, PageTabItem>;

//const HomePageTabItem: PageTabItem = { id: "/", path: "/", label: "Home" };
//const MAX_PAGE_SIZE = 10;

// function initPageTabMap(): PageTabMap {
//   return new Map([[HomePageTabItem.id, HomePageTabItem]]);
// }

const usePageTab = () => {
  const navigate = useNavigate();
  const { pageMap, curPageId, deletePageItem, resetPageMap } = usePageMapStore();

  // 하단 Page 에서 location에 대한 정보로 페이지를 표시한 후 해당 함수가 호출됨
  // const handleOpenPageTab = useCallback(
  //   ({ id, path, label }: PageTabItem) => {
  //     if (!pageTab.has(id)) {
  //       setPageTab((prevState: PageTabMap) => {
  //         const newPageTab = { id, path, label };
  //         const [homeId, ...rest] = [...prevState.keys()];

  //         if (rest.length > MAX_PAGE_SIZE) {
  //           prevState.delete(rest[0] ?? "");
  //           console.log("Home을 제외한 제일 첫번째 페이지가 삭제됐습니다. homeId ->", homeId);
  //         }
  //         return new Map(prevState).set(id, newPageTab);
  //       });
  //     }

  //     // handleCallbacks(id, DummyCallback);
  //     setcurPageId(id);
  //   },
  //   [setPageTab, pageTab.size]
  // );

  const getOriginPath = (id: string) => {
    let originPath = "/";
    const prevPageMap = pageMap.get(id);
    if (prevPageMap) {
      const { pathname, search } = prevPageMap;
      originPath = `${pathname}${search || ""}`;
    }
    return originPath;
  };

  const handleNavigatePageTab = useCallback(
    (id: string) => {
      const originPath = getOriginPath(id);
      navigate(originPath);
    },
    [pageMap]
  );

  //열려있는 탭을 삭제한다.
  const handleDeletePageTab = useCallback(
    (id: string) => {
      const isCurTab = curPageId === id;

      //열려있는 Tab이면 바로 이전 Tab을 연다
      if (isCurTab) {
        const ids = [...pageMap.keys()];
        const targetIdx = ids.indexOf(id);
        const prevIdx = Math.max(targetIdx - 1, 0);
        const prevId = ids[prevIdx];
        const prevItem = pageMap.get(prevId);

        if (prevItem && prevItem.id) {
          const originPath = getOriginPath(prevItem.id);
          navigate(originPath);
        }
      }

      deletePageItem(id);
    },
    [pageMap]
  );

  return {
    openedPageMap: pageMap,
    curPageId,
    onPageTabClick: handleNavigatePageTab,
    onPageTabClose: handleDeletePageTab,
    onPageTabClear: resetPageMap,
  };
};

export default usePageTab;
