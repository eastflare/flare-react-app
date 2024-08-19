import { Crud } from "@/models/common/Edit";

export interface Menu {
  mnuId: string;
  mnuNm?: string;
  mnuUrl?: string;
  mnuLvNo?: number;
  upprMnuId?: string;
  sortOrd?: number;
  useYn?: string;
  mnuEpsYn?: string;
  mnuOptValCtn1?: string;
  mnuOptValCtn2?: string;
  mnuOptValCtn3?: string;
  mnuOptValCtn4?: string;
  mnuOptValCtn5?: string;
  msgCtn?: string;
  mnuKoNm?: string;
  mnuEnNm?: string;
  mnuPlNm?: string;
  mnuZhtNm?: string;
  mnuZhcNm?: string;
  mnuDesc?: string;
  childrens?: Menu[];
}

export interface MenuVO extends Menu {
  isChecked?: boolean;
  optionName?: string;
  optionValue?: string;
}

export interface MenuRequest extends Crud {
  mnuId: string;
  mnuNm: string;
  targetMenuId: string;
  menuLocation: string; //'1' : up, '2' : down, '3':inner, '4':none
  useYn: string;
  mnuEpsYn?: string;
  mnuOptValCtn1?: string;
  mnuOptValCtn2?: string;
  mnuOptValCtn3?: string;
  mnuOptValCtn4?: string;
  mnuOptValCtn5?: string;
  msgCtn?: string;
  mnuUrl: string;
  mnuDesc: string;
}
export enum MenuEnum {
  root = "000000",
  home = "HOME",
}

export interface MenuContextType {
  selectedHeaderMenu: string;
  currentMenu: Menu;
  clickedByHeaderMenu: boolean;
  handleMenuChange: (item: MenuContextType) => void;
  showMenu: boolean;
  handleShowMenuChange: (showMenu: boolean) => void;
}

export const defaultMenuContext: MenuContextType = {
  selectedHeaderMenu: "",
  currentMenu: { mnuId: "" } as Menu,
  clickedByHeaderMenu: false,
  handleMenuChange: () => {},
  showMenu: true,
  handleShowMenuChange: () => {},
};

export const HomeMenu: Menu = {
  mnuId: MenuEnum.root,
  mnuNm: MenuEnum.home,
};

export const INTERNAL_MENU_PATHS = ["login"];
