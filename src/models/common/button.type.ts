export interface ButtonProps {
  onClick: () => void;
  text?: string;
}

export interface SidebarButtonProps extends ButtonProps {
  isClicked: boolean;
  isSubSideBar?: boolean;
}
