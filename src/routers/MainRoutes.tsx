import Home from "pages/HomePage";
import About from "pages/About";
import Services from "pages/Services";
import Contact from "pages/Contact";
import { Route, useLocation, useNavigate } from "react-router-dom";
import MainContainer from "components/cmn/Layout/MainContainer";
import Sample1 from "pages/Sample1";
import Sample2 from "pages/Sample2";
import Sample3 from "pages/Sample3";
import PageRoutes from "components/cmn/Layout/PageRoutes";
import { PageRouterProvider } from "contexts/cmn/PageRouterContext";
import { useCallback, useEffect, useState } from "react";

export type PageTabItem = { id: string; path: string; label: string };
export type PageTabMap = Map<string, PageTabItem>;

const HomePageTabItem: PageTabItem = { id: "/", path: "/", label: "Home" };
const MAX_PAGE_SIZE = 10;

function initPageTabMap(): PageTabMap {
  return new Map([[HomePageTabItem.id, HomePageTabItem]]);
}

const MainRoutes = () => {
  const navigate = useNavigate();

  const [curPageTabId, setCurPageTabId] = useState<string>("");
  const [pageTab, setPageTab] = useState<PageTabMap>(initPageTabMap());
  const [deletePageTabId, setDeletePageTabId] = useState<string | undefined>();
  const { key, pathname } = useLocation();

  const handleNavigatePageTab = useCallback(
    ({ path }: Pick<PageTabItem, "path">) => {
      navigate?.(path);
    },
    [navigate]
  );

  const handleOpenPageTab = useCallback(
    ({ id, path, label }: PageTabItem) => {
      if (!pageTab.has(id)) {
        setPageTab((prevState: PageTabMap) => {
          const newPageTab = { id, path, label };
          const [homeId, ...rest] = [...prevState.keys()];

          if (rest.length > MAX_PAGE_SIZE) {
            prevState.delete(rest[0] ?? "");
            console.log("Home을 제외한 제일 첫번째 페이지가 삭제됐습니다. homeId ->", homeId);
          }
          return new Map(prevState).set(id, newPageTab);
        });
      }
      console.log("이건 언제되는 건가요?", id);
      setCurPageTabId(id);
    },
    [setPageTab, pageTab.size]
  );

  //열려있는 모든 Tab을 초기화 한다.
  const handleClearPageTab = useCallback(() => {
    setPageTab(initPageTabMap());
  }, [setPageTab]);

  //열려있는 탭을 삭제한다.
  const handleDeletePageTab = useCallback(
    (id: string) => (e: MouseEvent | undefined) => {
      e?.stopPropagation();
      const isCurTab = curPageTabId === id;

      //열려있는 Tab이면 바로 이전 Tab을 연다
      if (isCurTab) {
        const ids = [...pageTab.keys()];
        const targetIdx = ids.indexOf(id);
        const prevIdx = Math.max(targetIdx - 1, 0);
        const prevId = ids[prevIdx];
        const prevItem = pageTab.get(prevId);

        if (prevItem && prevItem.path) {
          navigate?.(prevItem.path);
        }
      }

      //Tab을 지운다
      setPageTab(prevState => {
        const newState = new Map(prevState);
        newState.delete(id);
        return newState;
      });

      //Body에다가 지원진 아이디를 알려준다 (Body에서는 해당 ID에 해당하는 Body를 삭제한다.)
      setDeletePageTabId(id);
    },
    [pageTab, setPageTab, curPageTabId]
  );

  //페이지를 삭제한 후 동기화를 위해 삭제한 곳에서 호출됨
  const handleDeletePageTabOk = useCallback(() => {
    setDeletePageTabId(undefined);
  }, []);

  useEffect(() => {
    pageTab.forEach((pageTabItem, id) => {
      if (pageTabItem.path === pathname) {
        setCurPageTabId(String(id));
      }
    });
  }, [key, pathname, pageTab]);

  const getPageRouterProviderProps = () => ({
    pageTab,
    setPageTab,
    curPageTabId,
    onOpenPageTab: handleOpenPageTab,
    onClearPageTab: handleClearPageTab,
    onDeletePageTab: handleDeletePageTab,
    onNavigatePageTab: handleNavigatePageTab,
    deletePageTabId: deletePageTabId,
    onDeletePageTabOk: handleDeletePageTabOk,
  });

  return (
    <PageRouterProvider value={{ ...getPageRouterProviderProps() }}>
      <MainContainer>
        <PageRoutes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sample1' element={<Sample1 />} />
          <Route path='/sample2' element={<Sample2 />} />
          <Route path='/sample3' element={<Sample3 />} />
        </PageRoutes>
      </MainContainer>
    </PageRouterProvider>
  );
};

export default MainRoutes;
