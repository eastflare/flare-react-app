import PageRenderer from "./PageRenderer";
import usePageRoutes from "hooks/layout/usePageRoutes";
import { memo } from "react";
import routes from "@/pages/page-route";

const PageContainer = () => {
  const { curPageId, openedPageMap } = usePageRoutes({ routes });
  return <PageRenderer curPageId={curPageId} openedPageMap={openedPageMap} />;
};

export default memo(PageContainer);
