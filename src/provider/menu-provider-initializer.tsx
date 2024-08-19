import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getSession } from "apis/Session";
import useLanguageStore from "stores/useLanguageStore";
import useSessionStore from "stores/useSessionStore";
import { createAccessLog } from "./menu-provider.utils";
import { useMenuContext } from "./menu-provider";

function MenuProviderInitializer({ children }: { children: React.ReactNode }) {
  //Path가 변경될경우
  //언어가 변경될 경우

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userId, menus, setSession } = useSessionStore();
  const { changeLanguage, initLanguage } = useLanguageStore();
  const { handleShowMenuChange } = useMenuContext();

  //초기화 여부
  const [initialized, setInitialized] = useState(false);

  const initialize = async () => {
    try {
      //로그인 페이지나 userId가 있으면(세션이 있으면) Init 완료로 처리한다.
      if (userId || pathname === "/login") {
        return;
      }

      //세션정보를 서버에서 조회 한다.
      const response = await getSession();

      if (response.successOrNot === "Y" && response?.data) {
        //세션정보가 있으면 React에 세션과 사용자 언어를 세팅한다.
        const session = response.data;
        changeLanguage(session.langCd || "ko");
        setSession(session);

        if (pathname !== "/") {
          //Home 경로가 아닐경우 메뉴ID 가 있는 경로의 경우 접근로그를 남긴다.
          const menuId = menus
            .filter(menu => menu.mnuUrl && pathname.endsWith(menu.mnuUrl))
            .map(menu => menu.mnuId)
            .find(Boolean);
          menuId && createAccessLog(menuId);
        }
      } else if (response.successOrNot === "N") {
        //세션을 못가져 왔을 경우
        const appEnv = `${process.env.NODE_ENV}`;

        if (appEnv == "local" || appEnv == "dev") {
          //개발환경일경우 로그인 페이지로 이동한다.
          navigate("/login", { replace: true });
          return;
        }

        //개발환경이 아닐경우 SSO 로그인 페이지로 이동한다.
        window.location.href = `http://eastflare.iptime.org/login?UURL=${process.env.REDIRECT_BASE_URL}&RTOA=1`;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    //주소에 showMenu 가 No 이거나 appint_url이 있으면 메뉴를 숨기고 Language를 초기화 한다.????
    const params = new URLSearchParams(location.search);
    if (params.get("showMenu") === "No" || params.get("appint_url")) {
      handleShowMenuChange(false);
      initLanguage();
    }

    //초기화 한다.
    initialize();
  }, []);

  if (!initialized) {
    // TODO: loading or inform message
    return null;
  }

  return <>{children}</>;
}
export { MenuProviderInitializer };
