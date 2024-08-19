import { createContext, useContext, useState } from "react";
import { MenuContextType, defaultMenuContext } from "@/models/system/Menu";
import { MenuProviderInner } from "./menu-provider-inner";
import { MenuProviderInitializer } from "./menu-provider-initializer";

const MenuContext = createContext<MenuContextType>(defaultMenuContext);

function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("MenuContext must be used within MenuProvider");
  }

  return context;
}

type MenuProviderProps = {
  children: React.ReactNode;
};

function MenuProvider({ children }: MenuProviderProps) {
  const [showMenu, setShowMenu] = useState(true);
  const [contextValue, setContextValue] = useState({
    ...defaultMenuContext,
    handleMenuChange: item => setContextValue(item),
    showMenu,
    handleShowMenuChange: isShowMenu => setShowMenu(isShowMenu),
  });

  return (
    <MenuContext.Provider value={contextValue}>
      <MenuProviderInitializer>
        <MenuProviderInner>{children}</MenuProviderInner>
      </MenuProviderInitializer>
    </MenuContext.Provider>
  );
}

export { MenuProvider, useMenuContext };
