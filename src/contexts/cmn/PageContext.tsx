import { TPageProviderProps } from "hooks/cmn/usePageProvider";
import { createContext, useContext } from "react";

interface PageProviderProps {
  children: React.ReactNode;
  value?: TPageProviderProps;
}

const PageContext = createContext<PageProviderProps["value"]>(undefined);

function usePageContext() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("context is not provided");
  }
  return context;
}

function PageProvider({ children, value }: PageProviderProps) {
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export { PageProvider, PageContext, usePageContext };
