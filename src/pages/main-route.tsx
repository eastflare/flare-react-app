import { RouteObject } from "react-router-dom";
import Home from "pages/home-page";
import NoPage from "pages/sample/no-page";
import SystemRoute from "./system/system-route";
import SampleRoute from "./sample/sample-route";

const MainRoutes: RouteObject[] = [
  { path: "/", element: <Home /> },
  ...SystemRoute,
  ...SampleRoute,
  { path: "*", element: <NoPage /> }, // Fallback for unmatched routes
];

export default MainRoutes;
