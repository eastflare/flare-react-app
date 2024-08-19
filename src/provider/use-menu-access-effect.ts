import { useEffect } from "react";
import { useLocation } from "react-router";
import { createAccessLog, createAccessLogByPath } from "./menu-provider.utils";
import useSessionStore from "stores/useSessionStore";

function useMenuAccessEffect() {
  const { pathname } = useLocation();
  const { userId, menus } = useSessionStore();

  useEffect(() => {
    //세션이 있으면서 경로가 변경됐을때 접근 로그를 적재한다.
    if (pathname !== "/" && userId) {
      const menuId = menus
        .filter(menu => menu.mnuUrl && pathname.endsWith(menu.mnuUrl))
        .map(menu => menu.mnuId)
        .find(Boolean);

      if (menuId) {
        //메뉴ID에 해당하는 경로이면 메뉴 접근 로그를 남긴다.
        createAccessLog(menuId);
      } else {
        //메뉴에 없는 페이지면 경로를 남긴다.
        createAccessLogByPath(pathname);
      }
    }
  }, [pathname]);
}

export { useMenuAccessEffect };
