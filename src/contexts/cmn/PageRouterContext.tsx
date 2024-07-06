import { createContext, useContext } from "react";

interface PageRouterProviderProps {
  children: React.ReactNode;
  value?: string;
}

const PageRouterContext = createContext<PageRouterProviderProps["value"]>(undefined);

function usePageRouterContext() {
  const context = useContext(PageRouterContext);
  if (!context) {
    throw new Error("context is not provided");
  }
  return context;
}

function PageRouterProvider({ children, value }: PageRouterProviderProps) {
  return <PageRouterContext.Provider value={value}>{children}</PageRouterContext.Provider>;
}

export { PageRouterProvider, PageRouterContext, usePageRouterContext };
