import { Route } from "react-router-dom";
import PageRoutes from "@/components/layout/PageRoutes";
import Home from "pages/home-page";
import NoPage from "pages/sample/no-page";
import loadable from "@loadable/component";
import Loading from "components/elements/Loading";
import React, { useEffect, useState } from "react";
import { findRoutesByRoles } from "@/apis/system/Route";

//const Home = loadable(() => import("pages/HomePage"));
// const AboutPage = loadable(() => import("pages/sample/about-page"), {
//   fallback: <Loading />,
// });
// const ServicesPage = loadable(() => import("pages/sample/service-page"), {
//   fallback: <Loading />,
// });
// const ContactPage = loadable(() => import("pages/sample/contact-page"), {
//   fallback: <Loading />,
// });
// const Sample1Page = loadable(() => import("pages/sample/sample1-page"), {
//   fallback: <Loading />,
// });
// const Sample2Page = loadable(() => import("pages/sample/sample2-page"), {
//   fallback: <Loading />,
// });
// const Sample3Page = loadable(() => import("pages/sample/sample3-page"), {
//   fallback: <Loading />,
// });
// const Sample4Page = loadable(() => import("pages/sample/sample4-page"), {
//   fallback: <Loading />,
// });
// const Sample5Page = loadable(() => import("pages/sample/sample5-page"), {
//   fallback: <Loading />,
// });
// const Sample6Page = loadable(() => import("pages/sample/sample6-page"), {
//   fallback: <Loading />,
// });
// const NoPage = loadable(() => import("pages/sample/no-page"), {
//   fallback: <Loading />,
// });
// const MyModal3Page = loadable(() => import("pages/sample/my-modal3-page"), {
//   fallback: <Loading />,
// });
// const GridPage = loadable(() => import("pages/sample/grid-page"), {
//   fallback: <Loading />,
// });
// const FormPage = loadable(() => import("pages/sample/form-page"), {
//   fallback: <Loading />,
// });
// const MyModal1Page = loadable(() => import("pages/sample/my-modal1-page"), {
//   fallback: <Loading />,
// });
// const MyModal2Page = loadable(() => import("pages/sample/my-modal2-page"), {
//   fallback: <Loading />,
// });
// const MatthewPage = loadable(() => import("pages/sample/matthew-page"), {
//   fallback: <Loading />,
// });
// const MyModalPage = loadable(() => import("pages/sample/my-modal-page"), {
//   fallback: <Loading />,
// });
// const DeviceDetectPage = loadable(() => import("pages/sample/device-detect-page"), {
//   fallback: <Loading />,
// });
// const RouteListPage = loadable(() => import("pages/system/route/route-list-page"), {
//   fallback: <Loading />,
// });
// const PageListPage = loadable(() => import("pages/system/page/page-list-page"), {
//   fallback: <Loading />,
// });
// const LoginLogListPage = loadable(() => import("pages/system/log/login-log-list-page"), {
//   fallback: <Loading />,
// });

export interface DynamicRoute {
  id: string;
  path: string;
  element: React.ComponentType<any>;
}

const MainRoutes = () => {
  const [routes, setRoutes] = useState<DynamicRoute[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await findRoutesByRoles();
        console.log("라우터 데이터 이다 이게 그놈보다 먼저 떠야 하는데..", data);

        const dynamicRoutes = data.map(route => {
          const componentImport = () =>
            import(`@/${route.cpntPathNm}`).catch(() => {
              console.error(`해당 경로의 Component를 Import 하지 못했습니다: /src/${route.cpntPathNm}`);
              return { default: () => <NoPage /> };
            });

          const element = loadable(componentImport, { fallback: <Loading /> });

          return {
            id: route.ruteId,
            path: route.rutePathNm,
            element,
          };
        });

        setRoutes(dynamicRoutes);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <PageRoutes>
      <Route path='/' element={<Home />} />

      {/* Dynamically add the routes */}
      {routes.map(route => (
        <Route key={route.id} path={route.path} element={<route.element />} />
      ))}

      <Route path='*' element={<NoPage />} />
    </PageRoutes>
  );
};

export default MainRoutes;
