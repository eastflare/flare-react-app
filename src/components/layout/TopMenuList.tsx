import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import useSessionStore from "stores/useSessionStore";
import { useMenuContext } from "@/provider/menu-provider";
import { MenuType } from "@/models/system/menu.types";
import { nest } from "@/utils/mainLayoutUtils";
import { Menu } from "@/models/system/Menu";
import { BgColor } from "@/ui/theme/Color";

function TopMenuList() {
  const { headerMenus, menus } = useSessionStore();
  const menuContext = useMenuContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  //const [theme] = useTheme();

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const retrieveMenuUrl = () => {
    if (!menus || !menuContext.selectedHeaderMenu) {
      return "";
    }

    const depth1Menus: Menu[] = menus.filter(item => item.upprMnuId === menuContext.selectedHeaderMenu);

    const newSideMenuList: MenuType[] = [];
    depth1Menus.forEach(item => {
      const tree = nest(menus, item.mnuId);

      newSideMenuList.push({
        menuInfo: item,
        children: tree,
      });
    });

    return newSideMenuList[0].children.length > 0 ? "/" + newSideMenuList[0].children[0]?.mnuUrl : "/" + newSideMenuList[0].menuInfo.mnuUrl;
  };

  useEffect(() => {
    if (menuContext.clickedByHeaderMenu) {
      navigate(retrieveMenuUrl());
    }
  }, [menuContext.selectedHeaderMenu]);

  return (
    <Box height='100%' display='flex' alignItems='center'>
      <Box
        height='100%'
        display='flex'
        gap='50px'
        sx={{
          "@media (max-width: 1600px)": {
            gap: "40px",
          },
          "@media (max-width: 1400px)": {
            gap: "30px",
          },
        }}
      >
        {headerMenus &&
          headerMenus.map(menu => (
            <Box
              key={menu.mnuId}
              position='relative'
              width='fit-content'
              height='100%'
              display='flex'
              alignItems='center'
              justifyContent='center'
              onMouseEnter={() => setHoveredMenu(menu.mnuId)}
              onMouseLeave={() => setHoveredMenu(null)}
              sx={{
                cursor: "pointer",
              }}
            >
              <Typography fontSize='14px' fontWeight={700} color={menu.mnuId === menuContext.selectedHeaderMenu ? "#5B5C5B" : "#979998"}>
                {t(`${menu.msgCtn}`, `${menu.mnuNm}`)}
              </Typography>
              <Box
                position='absolute'
                display={menu.mnuId === menuContext.selectedHeaderMenu ? "block" : "none"}
                width='120%'
                height='3px'
                bottom='-15px'
                left='50%'
                bgcolor={"#2D9BB2"}
                sx={{
                  transform: "translateX(-50%)",
                  transition: "3s",
                }}
              />
              {/* 하위 메뉴 표시 */}
              {hoveredMenu === menu.mnuId && (
                <Box position='absolute' top='100%' left='0' bgcolor='white' boxShadow={3} zIndex={1}>
                  {menus
                    .filter(subMenu => subMenu.upprMnuId === menu.mnuId)
                    .filter(sub => sub.mnuEpsYn === "Y")
                    .map(subMenu => (
                      <Box
                        key={subMenu.mnuId}
                        component={Link}
                        to={subMenu.mnuUrl!}
                        sx={{
                          padding: "10px 20px",
                          textDecoration: "none",
                          display: "block",
                          color: "#1F1F1F",
                          width: "auto",
                          whiteSpace: "nowrap",
                          backgroundColor: `${BgColor.Gray50}`,
                          "&:hover": {
                            color: "#1F1F1F",
                            backgroundColor: "#DDE0DF",
                            textDecoration: "none",
                          },
                        }}
                      >
                        {t(`${subMenu.msgCtn}`, `${subMenu.mnuNm}`)}
                      </Box>
                    ))}
                </Box>
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export { TopMenuList };
