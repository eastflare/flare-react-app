import { useCallback } from "react";
import { NavigateFunction } from "react-router-dom";
import usePageMapStore from "store/pageMapStore";

export type PageTabItem = { id: string; path: string; label: string };
export type PageTabMap = Map<string, PageTabItem>;

//const HomePageTabItem: PageTabItem = { id: "/", path: "/", label: "Home" };
//const MAX_PAGE_SIZE = 10;

// function initPageTabMap(): PageTabMap {
//   return new Map([[HomePageTabItem.id, HomePageTabItem]]);
// }

const usePageTab = (props: { navigate: NavigateFunction }) => {
  const { pageMap, curPageId, deletePageItem, resetPageMap } = usePageMapStore();

  //const [pageTab, setPageTab] = useState<PageTabMap>(initPageTabMap());
  //const [deletePageTabId, setDeletePageTabId] = useState<string | undefined>();

  // const [callbackMap, setCallbackMap] = useState({});
  // const handleCallbacks = useCallback((id: string, callback: () => void) => {
  //   setCallbackMap(prevState => {
  //     return { ...prevState, [id]: callback };
  //   });
  // }, []);

  //const { key, pathname } = useLocation();

  // useEffect(() => {
  //   console.log("callback이 담겨져있습니다.-->", callbackMap);
  // }, [pathname]);

  // PageTab을 클릭했을 경우 주소를 해당페이지의 주소로 넘긴다.
  // const handleNavigatePageTab = useCallback(
  //   ({ path }: Pick<PageTabItem, "path">) => {
  //     props.navigate?.(path, { state: { message: "value1", message2: "value2" } });
  //   },
  //   [props.navigate]
  // );

  // const DummyCallback = useCallback(() => {
  //   alert("aaaa");
  //   return;
  // }, []);

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
      props.navigate(originPath);
    },
    [pageMap]
  );

  //열려있는 탭을 삭제한다.
  const handleDeletePageTab = useCallback(
    (id: string) => (e: MouseEvent | undefined) => {
      e?.stopPropagation();
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
          props.navigate(originPath);
        }
      }

      deletePageItem(id);
    },
    [pageMap]
  );

  // useEffect(() => {
  //   pageTab.forEach((pageTabItem, id) => {
  //     if (pageTabItem.path === pathname) {
  //       setcurPageId(String(id));
  //     }
  //   });
  // }, [key, pathname, pageTab]);

  // const getPageRouterProviderProps = () => ({
  //   pageTab,
  //   setPageTab,
  //   curPageId,
  //   onOpenPageTab: handleOpenPageTab,
  //   onClearPageTab: handleClearPageTab,
  //   onDeletePageTab: handleDeletePageTab,
  //   onNavigatePageTab: handleNavigatePageTab,
  //   deletePageTabId: deletePageTabId,
  //   onDeletePageTabOk: handleDeletePageTabOk,
  //   //callbacks: callbacks,
  //   //onAddCallbacks: handleCallbacks,
  // });

  return {
    openedPageMap: pageMap,
    curPageId,
    onPageTabClick: handleNavigatePageTab,
    onPageTabClose: handleDeletePageTab,
    onPageTabClear: resetPageMap,
  };
};

export default usePageTab;

//Context 에서 사용하기 위한 Type을 ReturnType의 함수를 통해 정의함.
// export type TPageRouterProviderProps = ReturnType<
//   ReturnType<typeof usePageTab>["getPageRouterProviderProps"]
// >;
