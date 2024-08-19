import { create } from "zustand";
import { MenuEnum } from "@/models/system/Menu";

interface MenuManagementState {
  modalOpen: boolean;
  menuId: string;
  menuName: string;
  targetMenuId: MenuEnum;
  menuLocation: string;
  menuUseYn: string;
  menuExposureYn: string;
  menuOptionValue1: string;
  menuOptionValue2: string;
  menuOptionValue3: string;
  menuOptionValue4: string;
  menuOptionValue5: string;
  messageCode: string;
  menuUrl: string;
  menuDesc: string;
  menuInfoId: string;
  menuInfoUrl: string;
  menuInfoDesc: string;
  rolesByMenu: any[];
  employeesByMenu: any[];
  departmentByMenu: any[];
  allMenuList: any[];
  allMenuListExceptClickedMenu: any[];
  menuListWithCheckbox: any[];
  menuListbyRole: any[];
  setModalOpen: (modalOpen: boolean) => void;
  setMenuId: (menuId: string) => void;
  setMenuName: (menuName: string) => void;
  setTargetMenuId: (targetMenuId: MenuEnum) => void;
  setMenuLocation: (menuLocation: string) => void;
  setMenuUseYn: (menuUseYn: string) => void;
  setMenuExposureYn: (menuExposureYn: string) => void;
  setMenuOptionValue1: (menuOptionValue1: string) => void;
  setMenuOptionValue2: (menuOptionValue2: string) => void;
  setMenuOptionValue3: (menuOptionValue3: string) => void;
  setMenuOptionValue4: (menuOptionValue4: string) => void;
  setMenuOptionValue5: (menuOptionValue5: string) => void;
  setMessageCode: (messageCode: string) => void;
  setMenuUrl: (menuUrl: string) => void;
  setMenuDesc: (menuDesc: string) => void;
  setMenuInfoId: (menuInfoId: string) => void;
  setMenuInfoUrl: (menuInfoUrl: string) => void;
  setMenuInfoDesc: (menuInfoDesc: string) => void;
  setRolesByMenu: (rolesByMenu: any[]) => void;
  setEmployeesByMenu: (employeesByMenu: any[]) => void;
  setDepartmentsByMenu: (departmentByMenu: any[]) => void;
  setAllMenuList: (allMenuList: any[]) => void;
  setAllMenuListExceptClickedMenu: (allMenuListExceptClickedMenu: any[]) => void;
  setMenuListWithCheckbox: (menuListWithCheckbox: any[]) => void;
  setMenuListbyRole: (menuListbyRole: any[]) => void;
  setInitMenuList: () => void;
}

const initMenuManagement = {
  modalOpen: false,
  menuId: "",
  menuName: "",
  targetMenuId: MenuEnum.root,
  menuLocation: "3",
  menuUseYn: "Y",
  menuExposureYn: "Y",
  menuOptionValue1: "",
  menuOptionValue2: "",
  menuOptionValue3: "",
  menuOptionValue4: "",
  menuOptionValue5: "",
  messageCode: "",
  menuUrl: "",
  menuDesc: "",
  menuInfoId: "",
  menuInfoUrl: "",
  menuInfoDesc: "",
  rolesByMenu: [],
  employeesByMenu: [],
  departmentByMenu: [],
  allMenuList: [],
  allMenuListExceptClickedMenu: [],
  menuListWithCheckbox: [],
  menuListbyRole: [],
};

const useMenuManagementStore = create<MenuManagementState>(set => ({
  ...initMenuManagement,

  setModalOpen(modalOpen: boolean) {
    set(prev => ({ ...prev, modalOpen }));
  },

  setMenuId(menuId: string) {
    menuId = replaceNullToEmptyString(menuId);
    set(prev => ({ ...prev, menuId }));
  },

  setMenuName(menuName: string) {
    menuName = replaceNullToEmptyString(menuName);
    set(prev => ({ ...prev, menuName }));
  },

  setTargetMenuId(targetMenuId: MenuEnum) {
    set(prev => ({ ...prev, targetMenuId }));
  },

  setMenuLocation(menuLocation: string) {
    set(prev => ({ ...prev, menuLocation }));
  },

  setMenuUseYn(menuUseYn: string) {
    set(prev => ({ ...prev, menuUseYn }));
  },

  setMenuExposureYn(menuExposureYn: string) {
    set(prev => ({ ...prev, menuExposureYn }));
  },

  setMenuOptionValue1(menuOptionValue1: string) {
    menuOptionValue1 = replaceNullToEmptyString(menuOptionValue1);
    set(prev => ({ ...prev, menuOptionValue1 }));
  },

  setMenuOptionValue2(menuOptionValue2: string) {
    menuOptionValue2 = replaceNullToEmptyString(menuOptionValue2);
    set(prev => ({ ...prev, menuOptionValue2 }));
  },

  setMenuOptionValue3(menuOptionValue3: string) {
    menuOptionValue3 = replaceNullToEmptyString(menuOptionValue3);
    set(prev => ({ ...prev, menuOptionValue3 }));
  },

  setMenuOptionValue4(menuOptionValue4: string) {
    menuOptionValue4 = replaceNullToEmptyString(menuOptionValue4);
    set(prev => ({ ...prev, menuOptionValue4 }));
  },

  setMenuOptionValue5(menuOptionValue5: string) {
    menuOptionValue5 = replaceNullToEmptyString(menuOptionValue5);
    set(prev => ({ ...prev, menuOptionValue5 }));
  },

  setMessageCode(messageCode: string) {
    set(prev => ({ ...prev, messageCode }));
  },

  setMenuUrl(menuUrl: string) {
    menuUrl = replaceNullToEmptyString(menuUrl);
    set(prev => ({ ...prev, menuUrl }));
  },

  setMenuDesc(menuDesc: string) {
    menuDesc = replaceNullToEmptyString(menuDesc);
    set(prev => ({ ...prev, menuDesc }));
  },

  setMenuInfoId(menuInfoId: string) {
    set(prev => ({ ...prev, menuInfoId }));
  },

  setMenuInfoUrl(menuInfoUrl: string) {
    set(prev => ({ ...prev, menuInfoUrl }));
  },

  setMenuInfoDesc(menuInfoDesc: string) {
    set(prev => ({ ...prev, menuInfoDesc }));
  },

  setRolesByMenu(rolesByMenu: any[]) {
    set(prev => ({ ...prev, rolesByMenu }));
  },

  setEmployeesByMenu(employeesByMenu: any[]) {
    set(prev => ({ ...prev, employeesByMenu }));
  },

  setDepartmentsByMenu(departmentByMenu: any[]) {
    set(prev => ({ ...prev, departmentByMenu }));
  },

  setAllMenuList(allMenuList: any[]) {
    set(prev => ({ ...prev, allMenuList }));
  },

  setAllMenuListExceptClickedMenu(allMenuListExceptClickedMenu: any[]) {
    set(prev => ({ ...prev, allMenuListExceptClickedMenu }));
  },

  setMenuListWithCheckbox(menuListWithCheckbox: any[]) {
    set(prev => ({ ...prev, menuListWithCheckbox }));
  },

  setMenuListbyRole(menuListbyRole: any[]) {
    set(prev => ({ ...prev, menuListbyRole }));
  },

  setInitMenuList() {
    set(() => ({ ...initMenuManagement }));
  },
}));

const replaceNullToEmptyString = (param: any) => {
  return param == null ? "" : param;
};

export default useMenuManagementStore;
