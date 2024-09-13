import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useSessionStore from "stores/useSessionStore";
import { HomeMenu, INTERNAL_MENU_PATHS, Menu } from "@/models/system/Menu";
import { useMenuContext } from "./menu-provider";

function useMenuPathEffect() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const { menus, headerMenus } = useSessionStore();
  const menuContext = useMenuContext();

  const { handleMenuChange } = menuContext;

  useEffect(() => {
    if (menus?.length > 0) {
      const pathNameUrl = decodeURIComponent(location.pathname.substring(1));
      let params = new URLSearchParams(location.search);
      params.delete("title");
      let searchUrl = decodeURIComponent(params.toString());
      if (searchUrl) {
        searchUrl = "?" + searchUrl;
      }
      const currentUrl = pathNameUrl + searchUrl;

      if (currentUrl === "") {
        handleMenuChange({
          ...menuContext,
          currentMenu: HomeMenu,
          clickedByHeaderMenu: false,
          selectedHeaderMenu: "",
        });
        return;
      }

      const menuEqualsByCurrentUrl = menus.find(menu => menu.mnuUrl === currentUrl);

      if (menuEqualsByCurrentUrl) {
        handleMenuChange({
          ...menuContext,
          currentMenu: menuEqualsByCurrentUrl,
          clickedByHeaderMenu: false,
          selectedHeaderMenu: headerMenus.find(headerMenu => headerMenu.mnuId === menuEqualsByCurrentUrl.upprMnuId)?.mnuId ?? menuContext.selectedHeaderMenu,
        });
        return;
      }

      const internalMenuEqualsByCurrentUrl = INTERNAL_MENU_PATHS.find(internalMenu => internalMenu === currentUrl);

      if (internalMenuEqualsByCurrentUrl) {
        handleMenuChange({
          ...menuContext,
          clickedByHeaderMenu: false,
        });
        return;
      }

      let menuSimilarByCurrentUrl: Menu | undefined;
      let splittedUrls = currentUrl.split("/");
      let len = splittedUrls.length;
      while (len > 1) {
        splittedUrls = splittedUrls.slice(0, len - 1);
        const similarUrl = splittedUrls.join("/");
        menuSimilarByCurrentUrl = menus.find(menu => menu.mnuUrl && similarUrl === menu.mnuUrl);

        if (menuSimilarByCurrentUrl) {
          break;
        }
        len = splittedUrls.length;
      }

      if (menuSimilarByCurrentUrl) {
        handleMenuChange({
          ...menuContext,
          currentMenu: menuSimilarByCurrentUrl,
          clickedByHeaderMenu: false,
          selectedHeaderMenu: headerMenus.find(headerMenu => headerMenu.mnuId === menuSimilarByCurrentUrl!.upprMnuId)?.mnuId ?? menuContext.selectedHeaderMenu,
        });

        return;
      }

      handleMenuChange({
        ...menuContext,
        currentMenu: HomeMenu,
        clickedByHeaderMenu: false,
        selectedHeaderMenu: "",
      });
      //navigate('/errorPage');
    }
  }, [pathname, search, menus]);
}

export { useMenuPathEffect };
