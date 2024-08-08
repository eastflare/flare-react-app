import { create } from "zustand";
import { MenuEnum } from "models/admin/Menu";

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
const useMenuManagementStore = create<any>(set => ({
  modalOpen: false,
  setModalOpen(modalOpen) {
    set(prev => ({ ...prev, modalOpen }));
  },

  menuId: "",
  setMenuId(menuId) {
    menuId = replaceNullToEmptyString(menuId);
    set(prev => ({ ...prev, menuId }));
  },

  menuName: "",
  setMenuName(menuName) {
    menuName = replaceNullToEmptyString(menuName);
    set(prev => ({ ...prev, menuName }));
  },

  targetMenuId: MenuEnum.root,
  setTargetMenuId(targetMenuId) {
    set(prev => ({ ...prev, targetMenuId }));
  },

  menuLocation: "3",
  setMenuLocation(menuLocation) {
    set(prev => ({ ...prev, menuLocation }));
  },

  menuUseYn: "Y",
  setMenuUseYn(menuUseYn) {
    set(prev => ({ ...prev, menuUseYn }));
  },

  menuExposureYn: "Y",
  setMenuExposureYn(menuExposureYn) {
    set(prev => ({ ...prev, menuExposureYn }));
  },

  menuOptionValue1: "",
  setMenuOptionValue1(menuOptionValue1) {
    menuOptionValue1 = replaceNullToEmptyString(menuOptionValue1);
    set(prev => ({ ...prev, menuOptionValue1 }));
  },

  menuOptionValue2: "",
  setMenuOptionValue2(menuOptionValue2) {
    menuOptionValue2 = replaceNullToEmptyString(menuOptionValue2);
    set(prev => ({ ...prev, menuOptionValue2 }));
  },

  menuOptionValue3: "",
  setMenuOptionValue3(menuOptionValue3) {
    menuOptionValue3 = replaceNullToEmptyString(menuOptionValue3);
    set(prev => ({ ...prev, menuOptionValue3 }));
  },

  menuOptionValue4: "",
  setMenuOptionValue4(menuOptionValue4) {
    menuOptionValue4 = replaceNullToEmptyString(menuOptionValue4);
    set(prev => ({ ...prev, menuOptionValue4 }));
  },

  menuOptionValue5: "",
  setMenuOptionValue5(menuOptionValue5) {
    menuOptionValue5 = replaceNullToEmptyString(menuOptionValue5);
    set(prev => ({ ...prev, menuOptionValue5 }));
  },

  messageCode: "",
  setMessageCode(messageCode) {
    set(prev => ({ ...prev, messageCode }));
  },

  menuUrl: "",
  setMenuUrl(menuUrl) {
    menuUrl = replaceNullToEmptyString(menuUrl);
    set(prev => ({ ...prev, menuUrl }));
  },

  menuDesc: "",
  setMenuDesc(menuDesc) {
    menuDesc = replaceNullToEmptyString(menuDesc);
    set(prev => ({ ...prev, menuDesc }));
  },

  menuInfoId: "",
  setMenuInfoId(menuInfoId) {
    set(prev => ({ ...prev, menuInfoId }));
  },

  menuInfoUrl: "",
  setMenuInfoUrl(menuInfoUrl) {
    set(prev => ({ ...prev, menuInfoUrl }));
  },

  menuInfoDesc: "",
  setMenuInfoDesc(menuInfoDesc) {
    set(prev => ({ ...prev, menuInfoDesc }));
  },

  rolesByMenu: [],
  setRolesByMenu(rolesByMenu) {
    set(prev => ({ ...prev, rolesByMenu }));
  },

  employeesByMenu: [],
  setEmployeesByMenu(employeesByMenu) {
    set(prev => ({ ...prev, employeesByMenu }));
  },

  departmentByMenu: [],
  setDepartmentsByMenu(departmentByMenu) {
    set(prev => ({ ...prev, departmentByMenu }));
  },

  allMenuList: [],
  setAllMenuList(allMenuList) {
    set(prev => ({ ...prev, allMenuList }));
  },

  allMenuListExceptClickedMenu: [],
  setAllMenuListExceptClickedMenu(allMenuListExceptClickedMenu) {
    set(prev => ({ ...prev, allMenuListExceptClickedMenu }));
  },

  menuListWithCheckbox: [],
  setMenuListWithCheckbox(menuListWithCheckbox) {
    set(prev => ({ ...prev, menuListWithCheckbox }));
  },

  menuListbyRole: [],
  setMenuListbyRole(menuListbyRole) {
    set(prev => ({ ...prev, menuListbyRole }));
  },

  setInitMenuList() {
    set(() => ({ ...initMenuManagement }));
  },
}));

const replaceNullToEmptyString = param => {
  return param == null ? "" : param;
};

export default useMenuManagementStore;
