import { useEffect } from "react";
import { useLocation } from "react-router";
import { createAccessLog, createAccessLogByPath } from "./menu-provider.utils";
import useSessionStore from "stores/useSessionStore";

function useMenuAccessEffect() {
  const { pathname } = useLocation();
  const { userId, menus } = useSessionStore();

  useEffect(() => {
    if (pathname !== "/" && userId) {
      const menuId = menus
        .filter(menu => menu.mnuUrl && pathname.endsWith(menu.mnuUrl))
        .map(menu => menu.mnuId)
        .find(Boolean);
      if (menuId) {
        createAccessLog(menuId);
      } else {
        createAccessLogByPath(pathname);
      }
    }
  }, [pathname]);
}

export { useMenuAccessEffect };
