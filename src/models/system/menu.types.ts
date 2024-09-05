import { Menu } from "models/system/Menu";

export type MenuType = {
  menuInfo: Menu;
  children: Menu[];
};

export type MenuTree = Menu & {
  children?: MenuTree[];
};
