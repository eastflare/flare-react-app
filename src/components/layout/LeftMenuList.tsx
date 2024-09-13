import { Menu } from "@/models/system/Menu";
import { useMenuContext } from "@/provider/menu-provider";
import { toAbsolutePath } from "@/utils/mainLayoutUtils";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTranslation } from "react-i18next";
import useSessionStore from "@/stores/useSessionStore";
import useMenuNavigate from "@/hooks/layout/useMenuNavigate";

type LeftMenuContentProps = {
  contentList: Menu[];
  isActive: boolean;
  openParent: () => void;
};

function LeftMenuContent({ contentList, isActive, openParent }: LeftMenuContentProps) {
  const [count, setCount] = useState<number>(1);
  const { currentMenu } = useMenuContext();
  const { menus } = useSessionStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { openPage } = useMenuNavigate();
  //const [theme] = useTheme();

  const navigateToMenu = (menuUrl: string) => {
    menuUrl && navigate(toAbsolutePath(menuUrl), { replace: true });
  };

  useEffect(() => {
    if (contentList.find(item => item.mnuId === currentMenu?.mnuId)) {
      openParent();
    } else if (currentMenu) {
      let cur: Menu | null = currentMenu;

      while (cur.mnuId != "000000") {
        cur = menus.find(menu => menu.mnuId === cur?.upprMnuId) ?? null;
        if (!cur) break;
        const lowestParent = contentList.find(item => item.mnuId === cur?.mnuId);
        if (lowestParent) {
          openParent();
          break;
        }
      }
    }
  }, [currentMenu]);

  return (
    <>
      {contentList.map(it => {
        if (it.childrens && it.childrens.some(child => child.mnuEpsYn === "Y")) {
          return (
            <Box
              width='100%'
              height={isActive ? `calc(40px * ${count})` : 0}
              overflow='hidden'
              sx={{
                transition: "height 0.35s ease",
              }}
              key={it.mnuId}
              onClick={() => setCount(isActive ? it.childrens?.length ?? 0 + 1 : 1)}
            >
              {/* <LeftMenuList
                    summary={{ menuInfo: it }}
                    content={it.children}
                    isActive={isActive}
                    openParent={openParent}
                  /> */}
            </Box>
          );
        }

        const isCurrentMenu = currentMenu?.mnuId === it.mnuId || (currentMenu?.mnuEpsYn === "N" && currentMenu?.upprMnuId === it.mnuId);

        return (
          <Box
            width='100%'
            height={isActive ? "calc(40px * 1)" : 0}
            overflow='hidden'
            bgcolor={isCurrentMenu ? "#6E706F" : "#F7F9F8"}
            sx={{
              transition: "height 0.35s ease",
            }}
            key={it.mnuId}
            onClick={event => {
              event.preventDefault();
              openPage(toAbsolutePath(it.mnuUrl ?? ""), {}, {});
              //navigateToMenu(it.mnuUrl ?? "");
            }}
          >
            <Box
              //   component={Link}
              //   to={it.mnuUrl ? toAbsolutePath(it.mnuUrl) : "/errorPage"}
              width='100%'
              height='100%'
              paddingLeft='36px'
              display='flex'
              alignItems='center'
              color={isCurrentMenu ? "#FFFFFF" : "#1F1F1F"}
              fontSize='12px'
              sx={{
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  color: isCurrentMenu ? "#FFFFFF" : "#2D9BB2",
                },
              }}
            >
              {t(`${it.msgCtn}`, `${it.mnuNm}`)}
            </Box>
          </Box>
        );
      })}
    </>
  );
}

type LeftMenuSummaryProps = {
  header: Menu;
  isSelectedMenu: boolean;
  hasEpsMenus: boolean;
};

function LeftMenuSummary({ header, isSelectedMenu, hasEpsMenus }: LeftMenuSummaryProps) {
  const { t } = useTranslation();
  //const [theme] = useTheme();

  const fontColor = (() => {
    if (hasEpsMenus) {
      return isSelectedMenu ? "#2D9BB2" : "#1F1F1F";
    }

    return isSelectedMenu ? "#FFFFFF" : "#1F1F1F";
  })();

  return (
    <Box display='flex' alignItems='center' gap='8px'>
      {header.mnuUrl ? (
        <Typography
          fontSize='13px'
          color={fontColor}
          sx={{
            wordBreak: "keep-all",
            whiteSpace: "pre",
          }}
        >
          {t(`${header.msgCtn}`, `${header.mnuNm}`)}
        </Typography>
      ) : (
        <Typography
          fontSize='13px'
          color={fontColor}
          sx={{
            wordBreak: "keep-all",
            whiteSpace: "pre",
          }}
        >
          {t(`${header.msgCtn}`, `${header.mnuNm}`)}
        </Typography>
      )}
    </Box>
  );
}

type LeftMenuListProps = {
  summary: { menuInfo: Menu };
  content: Menu[];
  isActive: boolean;
  openParent?: () => void;
};

function LeftMenuList({ summary, content, isActive, openParent }: LeftMenuListProps) {
  const [isOpen, setIsOpen] = useState(isActive);
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentMenu } = useMenuContext();
  const { openPage } = useMenuNavigate();
  //const [theme] = useTheme();

  const { menuInfo } = summary;

  const isCurrentMenu = currentMenu?.mnuId === menuInfo.mnuId || (currentMenu?.mnuEpsYn === "N" && currentMenu?.upprMnuId === menuInfo.mnuId);
  const hasEpsMenus = content.some(item => item.mnuEpsYn === "Y");
  const isSelectedMenu = hasEpsMenus ? isOpen : currentMenu?.mnuId === menuInfo.mnuId;

  const navigateToMenu = (menuUrl: string, linkTo?: boolean) => {
    linkTo && menuUrl && openPage(toAbsolutePath(menuUrl), {}, {});
    //linkTo && menuUrl && navigate(toAbsolutePath(menuUrl), { replace: false });
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    isOpen && openParent && openParent();
  }, [isOpen]);

  return (
    <Box width='100%' display='flex' flexDirection='column' overflow='hidden'>
      {menuInfo.mnuEpsYn === "Y" && (
        <Box
          height='40px'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          padding='0 15px'
          overflow='hidden'
          bgcolor={isCurrentMenu ? "#6E706F" : "#F7F9F8"}
          sx={{
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              bgcolor: isCurrentMenu ? "#6E706F" : "#DDE0DF",
            },
          }}
          onClick={() => {
            navigateToMenu(menuInfo.mnuUrl ?? "", !hasEpsMenus);
          }}
        >
          <LeftMenuSummary header={menuInfo} isSelectedMenu={isSelectedMenu} hasEpsMenus={hasEpsMenus} />
          {hasEpsMenus && (
            <>
              {isSelectedMenu ? (
                <RemoveIcon
                  fontSize='small'
                  sx={{
                    width: "13px",
                    height: "13px",
                    transition: "0.3s",
                  }}
                />
              ) : (
                <AddIcon
                  fontSize='small'
                  sx={{
                    width: "13px",
                    height: "13px",
                    transition: "0.3s",
                  }}
                />
              )}
            </>
          )}
        </Box>
      )}
      {hasEpsMenus && <LeftMenuContent contentList={content.filter(item => item.mnuEpsYn === "Y")} isActive={isOpen} openParent={() => setIsOpen(true)} />}
    </Box>
  );
}

export { LeftMenuList };
