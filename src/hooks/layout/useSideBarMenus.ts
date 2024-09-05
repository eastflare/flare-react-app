import { useEffect, useState } from "react";
import { useMenuContext } from "provider/menu-provider";
import { Menu } from "models/system/Menu";
import useSessionStore from "stores/useSessionStore";
import { MenuType } from "models/system/menu.types";
import { nest } from "utils/mainLayoutUtils";

function useSideBarMenus() {
  const [sideMenus, setSideMenus] = useState<MenuType[]>([]);

  const { menus } = useSessionStore();
  const { selectedHeaderMenu } = useMenuContext();

  useEffect(() => {
    if (menus && selectedHeaderMenu) {
      const depth1Menus: Menu[] = menus.filter(item => item.upprMnuId === selectedHeaderMenu);

      const newSideMenuList: MenuType[] = [];

      depth1Menus.forEach(item => {
        const tree = nest(menus, item.mnuId);
        newSideMenuList.push({
          menuInfo: item,
          children: tree,
        });
      });
      setSideMenus(newSideMenuList);
    }
  }, [selectedHeaderMenu, menus]);

  return { sideMenus };
}

export { useSideBarMenus };
