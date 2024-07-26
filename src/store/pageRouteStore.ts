import { ReactElement } from "react";
import { RouteObject, matchPath } from "react-router-dom";
import { create } from "zustand";

interface PageRouteStore {
  pageRoutes: Record<string, RouteObject>;
  setPageRoutes: (newRoutes: Record<string, RouteObject>) => void;
  getPageRoute: (routePath: string) => RouteObject | undefined;
  getElementByRoutePath: (routePath: string) => ReactElement;
}

const usePageRouteStore = create<PageRouteStore>((set, get) => ({
  pageRoutes: {},
  setPageRoutes: newRoutes => set({ pageRoutes: newRoutes }),
  getPageRoute: routePath => get().pageRoutes[routePath],
  getElementByRoutePath: routePath => get().pageRoutes[routePath].element as ReactElement,
}));

export default usePageRouteStore;
