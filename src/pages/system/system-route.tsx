import { RouteObject } from "react-router-dom";
import Loading from "@/components/elements/Loading";
import loadable from "@loadable/component";

const loadableOptions = { fallback: <Loading /> };
const PageListPage = loadable(() => import("pages/system/page/page-list-page"), loadableOptions);
const LoginLogListPage = loadable(() => import("pages/system/log/login-log-list-page"), loadableOptions);

const SystemRoute: RouteObject[] = [
  { path: "/system/page/page-list", element: <PageListPage /> },
  { path: "/system/log/login-log-list", element: <LoginLogListPage /> },
];

export default SystemRoute;
