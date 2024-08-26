import { useNavigate } from "react-router-dom";
import usePageCallbackStore from "stores/usePageCallbackStore";

interface PageOptions {
  key?: string;
  title?: string;
  isDetail?: boolean;
}

export default function useMenuNavigate() {
  const { addPageCallback } = usePageCallbackStore();
  const navigator = useNavigate();

  const openPage = (url: string, params: Record<string, any> = {}, options: PageOptions = {}) => {
    let queryParams = new Array();
    const newId = url;

    // 페이지 파라미터 추가
    Object.entries(params).forEach(([key, value]) => {
      queryParams.push(`${key}=${value}`);
    });

    const title = options?.title;
    if (title) {
      queryParams.push(`title=${encodeURIComponent(title)}`);
    }

    if (options?.isDetail) {
      queryParams.push("detailYn=Y");
    }

    if (params.callback) {
      queryParams.push("pageId=" + newId);
      addPageCallback(newId, params.callback);
    }

    const searchUrl = `${url}?${queryParams.join("&")}`;

    navigator(searchUrl);
  };

  const openDetail = (url: string, params: Record<string, any>, options: PageOptions = {}) => {
    const detailPageOptions = { ...options, isDetail: true };
    openPage(url, params, detailPageOptions);
  };

  return {
    openPage,
    openDetail,
  };
}
