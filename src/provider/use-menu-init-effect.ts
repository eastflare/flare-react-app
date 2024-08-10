import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getSession } from "apis/Session";
import useLanguageStore from "stores/useLanguageStore";
import useSessionStore from "stores/useSessionStore";
import { createAccessLog } from "./menu-provider.utils";
import { useMenuContext } from "./menu-provider";

function useMenuInitEffect() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userId, menus, setSession } = useSessionStore();
  const { changeLanguage, initLanguage } = useLanguageStore();
  const { handleShowMenuChange } = useMenuContext();

  const initialize = async () => {
    const response = await getSession();
    if (response.successOrNot === "Y" && response?.data) {
      const session = response.data;
      changeLanguage(session.langCd || "ko");
      setSession(session);

      if (pathname !== "/") {
        const menuId = menus
          .filter(menu => menu.mnuUrl && pathname.endsWith(menu.mnuUrl))
          .map(menu => menu.mnuId)
          .find(Boolean);
        menuId && createAccessLog(menuId);
      }
    } else if (response.successOrNot === "N") {
      const appEnv = `${process.env.NODE_ENV}`;

      if (appEnv == "local") {
        navigate("/login", { replace: true });
        return;
      }

      window.location.href = `http://eastflare.iptime.org/login?UURL=${process.env.API_BASE_URL}&RTOA=1`;
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("showMenu") === "No" || params.get("appint_url")) {
      handleShowMenuChange(false);
      initLanguage();
    }
    if (!userId && pathname !== "/login") {
      initialize();
    }
  }, []);
}

export { useMenuInitEffect };
