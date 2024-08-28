import { TMenuProviderProps } from "hooks/layout/useMenuProvider";
import { createContext, useContext } from "react";

interface MenuProviderProps {
  children: React.ReactNode;
  value?: TMenuProviderProps;
}

const MenuContext = createContext<MenuProviderProps["value"]>(undefined);

function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("context is not provided");
  }
  return context;
}

function MenuProvider({ children, value }: MenuProviderProps) {
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export { MenuProvider, MenuContext, useMenuContext };
