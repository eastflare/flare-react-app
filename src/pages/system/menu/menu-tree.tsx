import { Menu, MenuVO } from "@/models/system/Menu";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
//import { Tree, TreeData } from "@lges/design-system";
import { MenuEnum } from "@/pages/system/menu/menu-manage-page";
import useMenuManagementStore from "@/stores/useMenuManagementStore";
import { getDepartmentsByMenu, getEmployeesByMenu, getMenu, getRolesByMenu } from "@/apis/system/MenuApi";

export interface treeParam {
  items: MenuVO[];
}

const MenuTree = forwardRef(({ items }: treeParam, ref: React.Ref<any>) => {
  /*
  const {
    setModalOpen,
    setMenuId,
    setMenuName,
    setTargetMenuId,
    setMenuUseYn,
    setMenuExposureYn,
    setMenuOptionValue1,
    setMenuOptionValue2,
    setMenuOptionValue3,
    setMenuOptionValue4,
    setMenuOptionValue5,
    setMessageCode,
    setMenuUrl,
    setMenuDesc,
    setMenuInfoId,
    setMenuInfoUrl,
    setMenuInfoDesc,
    setRolesByMenu,
    setEmployeesByMenu,
    setDepartmentsByMenu,
    setMenuLocation,
    allMenuList,
    setAllMenuListExceptClickedMenu,
  } = useMenuManagementStore(state => state);

  const [tree, setTree] = useState<TreeData[]>([]);
  const [expandedNodes] = useState<string[]>([]);
  const nest = (menuData: MenuVO[], mnuId: string | null = null, link = "upprMnuId") =>
    menuData
      .filter(item => item[link] === mnuId)
      .map(item => ({
        ...item,
        id: item.mnuId,
        nodeName: item.mnuNm,
        isSelected: item.mnuId === MenuEnum.root,
        childrens: nest(menuData, item.mnuId),
      }));

  const showMenuDetail = async (menu: Menu) => {
    setMenuInfoId(menu.mnuId);
    setMenuInfoUrl(menu.mnuUrl == null ? "" : menu.mnuUrl);
    setMenuInfoDesc(menu.mnuDesc == null ? "" : menu.mnuDesc);
  };

  const getDataByMenuId = async (mnuId: string) => {
    const roles = await getRolesByMenu(mnuId);
    const employees = await getEmployeesByMenu(mnuId);
    const department = await getDepartmentsByMenu(mnuId);

    setRolesByMenu(roles);
    setEmployeesByMenu(employees);
    setDepartmentsByMenu(department);
  };

  const onUpdateMenu = (menu: Menu) => {
    setModalOpen(true);
    setMenuId(menu.mnuId);
    setMenuName(menu.mnuNm);
    setTargetMenuId(menu.mnuId === MenuEnum.root ? MenuEnum.root : menu.upprMnuId);
    setMenuUseYn(menu.useYn);
    setMenuExposureYn(menu.mnuEpsYn);
    setMenuOptionValue1(menu.mnuOptValCtn1);
    setMenuOptionValue2(menu.mnuOptValCtn2);
    setMenuOptionValue3(menu.mnuOptValCtn3);
    setMenuOptionValue4(menu.mnuOptValCtn4);
    setMenuOptionValue5(menu.mnuOptValCtn5);
    setMessageCode(menu.msgCtn);
    setMenuUrl(menu.mnuUrl);
    setMenuDesc(menu.mnuDesc);
    setMenuLocation("4");

    const removeClickedMenuList = allMenuList.filter(item => item.mnuId !== menu.mnuId);

    setAllMenuListExceptClickedMenu(removeClickedMenuList);
  };

  const handleClickMenu = async (mnuId: string) => {
    const menu = await getMenu(mnuId);
    showMenuDetail(menu);
    getDataByMenuId(mnuId);

    onUpdateMenu(menu);
  };

  useEffect(() => {
    setTree(nest(items));
  }, [items]);

  useEffect(() => {
    if (tree.length > 0) {
      handleClickMenu(MenuEnum.root);
    }
  }, [tree]);

  useImperativeHandle(ref, () => ({
    handleClickMenu: mnuId => {
      return handleClickMenu(mnuId);
    },
  }));

  return <>{tree && <Tree data={tree} maxDepth={8} onClick={handleClickMenu} variant='triangle' expandedNodes={expandedNodes} />}</>;
  */
  return <></>;
});

export default MenuTree;

MenuTree.displayName = "MenuTree";
