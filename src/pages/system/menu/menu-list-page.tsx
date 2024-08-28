/** @jsxImportSource @emotion/react */
import { useTranslation } from "react-i18next";
//import { BorderColor, BasicColor } from 'ui/theme/Color';
import { css } from "@mui/material";
/*import {
  Button,
  DetailTableDataCell,
  DetailTableHeaderCell,
  DetailTableLine,
  DetailTableRow,
  DropdownField,
  HelperText,
  InputField,
  Label,
  Switch,
  useMessageBar,
} from '@lges/design-system'; 
import { Box, FormControl, FormControlLabel, Radio } from '@mui/material';
import useMenuManagementStore from '@/stores/useMenuManagementStore';
import { useMenuAllQuery } from '@/hooks/queries/system/menu/use-menu-query';
import { useMessageModalStore } from '@/stores/useMessageModalStore';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, MenuRequest, MenuVO } from '@/models/system/Menu';
import { createMenu, deleteMenus } from '@/apis/system/MenuApi';
import { CrudCode } from '@/models/common/Edit';
import { useQueryClient } from '@tanstack/react-query';
import { MenuQueryKeys } from '@/hooks/queries/system/menu/menu-query-keys';
import { useCommonModal } from '@/hooks/useCommonModal';
import { MessageModal } from '@/components/modals/common/MessageModal';
import useSessionStore from '@/stores/useSessionStore';
import useLanguageStore from '@/stores/useLanguageStore';
import { useReloadMessageCacheMutate } from '@/hooks/queries/system/message/use-reload-message-cache-mutate';
import { useDeployTranslatedMessagesQuery } from '@/hooks/queries/system/message/use-deploy-translated-messages-query';
import { SuccessOrNot } from '@/models/common/RestApi';
import MenuTree from './menu-tree';
import { RadioGroup, Typography } from '@mui/material';
import { Spacer, ButtonGroup } from '@/components/ui/common-ui';

import {
  ControlConfirmIcon,
  ControlResetIcon,
  EditDeleteIcon,
  EditEdit2Icon,
  FunctionSettingIcon,
} from '@lges/design-system/icon';
*/
export enum MenuEnum {
  root = "000000",
  home = "HOME",
}
/*
const st = {
  checkbox: css'
    margin-right: 5px;
    padding: 0;
    color: ${BorderColor.Form};

    .MuiSvgIcon-root {
      width: 20px;
      height: 20px;
    }

    &.Mui-checked {
      color: #2d9bb2;
    }
  ',
  radio: css'
    padding-right: 3px;
    color: ${BorderColor.Form};
    &.Mui-checked {
      color: #2d9bb2;
    }

    &.purple.Mui-checked {
      color: ${BasicColor.Secondary};
    }
  ',
  label: css'
    height: 32px;

    .MuiFormControlLabel-label {
      font-size: 13px;
      font-weight: 400;
    }

    &.displayFlex {
      display: flex;
      flex: 1 0 100%;
    }

    &.marginR0 {
      margin-right: 0;
    }

    &.marginL0 {
      margin-left: 0;
    }

    & + .buttonHelp {
      margin-right: 16px;
    }
  ',
  popover: css'
    .MuiPopover-paper {
      padding: 15px;
      background-color: #000;
      opacity: 0.9 !important;
      max-width: 300px;
    }

    .popoverCont {
      color: #fff;
      font-size: 13px;
      line-height: 1.4;
    }
  ',
};
*/

export const MenuPage = () => {
  /*
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: menus } = useMenuAllQuery();
  const {
    setModalOpen,
    menuId,
    setMenuId,
    menuName,
    setMenuName,
    targetMenuId,
    setTargetMenuId,
    menuLocation,
    setMenuLocation,
    menuUseYn,
    setMenuUseYn,
    menuExposureYn,
    setMenuExposureYn,
    menuOptionValue1,
    setMenuOptionValue1,
    menuOptionValue2,
    setMenuOptionValue2,
    menuOptionValue3,
    setMenuOptionValue3,
    menuOptionValue4,
    setMenuOptionValue4,
    menuOptionValue5,
    setMenuOptionValue5,
    messageCode,
    setMessageCode,
    menuUrl,
    setMenuUrl,
    menuDesc,
    setMenuDesc,
    menuInfoId,
    allMenuList,
    setAllMenuList,
    setMenuListbyRole,
    setInitMenuList,
  } = useMenuManagementStore((state) => state);
  const menuTreeRef = useRef<{ handleClickMenu: (menuId) => void }>(null);
  const { setMessageModalStateWhenModalOpen } = useMessageModalStore();
  const { setMenus } = useSessionStore();
  const { currentLanguage, translatedMessages, refreshLanguage } = useLanguageStore();
  const { openCommonModal } = useCommonModal();
  const { showMessageBar } = useMessageBar();

  const [menuNameErrorMessage, setMenuNameErrorMessage] = useState('');
  const [urlErrorMessage, setUrlErrorMessage] = useState('');

  const { mutate: reloadMessageCache } = useReloadMessageCacheMutate();
  const [deployTranslatedMessageEnabled, setDeployTranslatedMessageEnabled] =
    useState<boolean>(false);

  const { data: deployTranslatedMessageResult } = useDeployTranslatedMessagesQuery(
    deployTranslatedMessageEnabled
  );

  const handleMultiLanguageButton = () => {
    alert(1);
    setMessageModalStateWhenModalOpen(messageCode, undefined, (item) => {
      if (item && item.length === 2) {
        setMenuName(item[0]);
        setMessageCode(item[1]);
      }
      reloadMessageCache();
      setDeployTranslatedMessageEnabled(true);
      openCommonModal({ content: t('com.msg.scsSave', '저장되었습니다.') });
    });
  };

  const refreshMenu = () => {
    setMenuId('');
    setMenuName('');
    setMenuLocation('3');
    setMenuUseYn('Y');
    setMenuExposureYn('Y');
    setMenuOptionValue1('');
    setMenuOptionValue2('');
    setMenuOptionValue3('');
    setMenuOptionValue4('');
    setMenuOptionValue5('');
    setMessageCode('');
    setMenuUrl('');
    setMenuDesc('');
    setModalOpen(false);
    setMenuListbyRole([]);
    setMenuNameErrorMessage('');
    setUrlErrorMessage('');
    console.log("refresh menu!");
  };

  const saveMenu = async () => {
    let isValid = false;

    if (menuName.length === 0) {
      setMenuNameErrorMessage(
        '${t(
          'menu-management.alert.메뉴명(한국어)를 입력해 주세요.',
          '__메뉴명(한국어)를 입력해 주세요.'
        )}'
      );
      isValid = true;
    }

    if (isValid) return;

    const newMenu: MenuRequest = {
      mnuId: menuId,
      mnuNm: menuName,
      targetMenuId: targetMenuId,
      menuLocation: menuLocation,
      useYn: menuUseYn,
      mnuEpsYn: menuExposureYn,
      mnuOptValCtn1: menuOptionValue1,
      mnuOptValCtn2: menuOptionValue2,
      mnuOptValCtn3: menuOptionValue3,
      mnuOptValCtn4: menuOptionValue4,
      mnuOptValCtn5: menuOptionValue5,
      msgCtn: messageCode,
      mnuUrl: menuUrl,
      mnuDesc: menuDesc,
      crudKey: menuId ? CrudCode.UPDATE : CrudCode.CREATE,
    };
    await createMenu(newMenu).then(() => {
      showMessageBar({
        message: t('com.msg.scsSave', '저장되었습니다.'),
        multipleLines: true,
        usecase: 'success',
      });
    });

    queryClient.invalidateQueries({ queryKey: MenuQueryKeys.menuAll() });
    refreshMenu();
  };

  const onClickAddMenu = () => {
    console.log("메뉴추가 버튼 클릭");
    refreshMenu();
    setTargetMenuId(menuInfoId);
  };

  const deleteMenu = async (menu: Menu) => {
    await deleteMenus(menu.mnuId);
    queryClient.invalidateQueries({ queryKey: MenuQueryKeys.menuAll() });
    refreshMenu();
  };

  const callbackConfirmModal = (menu: Menu) => {
    deleteMenu(menu);
  };

  const onDeleteMenu = () => {
    const menu = menus?.find((menu) => menuInfoId === menu.mnuId);
    if (menu) {
      openCommonModal({
        modalType: 'confirm',
        content: t(
          'menu-management.confirm.{{}}과 그 하위 메뉴를 모두 삭제하시겠습니까?',
          '__{{delClickedMenu}}과 그 하위 메뉴를 모두 삭제하시겠습니까?',
          { delClickedMenu: menu?.mnuNm }
        ),
        yesCallback: () => {
          menu && callbackConfirmModal(menu);
        },
      });
    }
  };

  useEffect(() => {
    refreshMenu();
    return () => setInitMenuList();
  }, []);

  useEffect(() => {
    if (menus && currentLanguage) {
      const translatedItems: MenuVO[] = menus.map((menu) => {
        if (menu.msgCtn) {
          if (translatedMessages[menu.msgCtn])
            return { ...menu, mnuNm: translatedMessages[menu.msgCtn] };
          else return { ...menu, mnuNm: '__${menu.mnuNm}' };
        } else return { ...menu };
      });
      setMenus(translatedItems);
      const allMenuListWithOptionName = translatedItems?.map((element: MenuVO) => {
        return { ...element, optionName: element.mnuNm, optionValue: element.mnuId };
      });
      setAllMenuList(allMenuListWithOptionName);

      if (menuInfoId) {
        const menu = translatedItems?.find((menu) => menuInfoId === menu.mnuId);
        menu && setMenuName(menu.mnuNm);
      }
    }
  }, [menus, currentLanguage, translatedMessages]);

  // 메뉴 변경시 에러내용 초기화
  useEffect(() => {
    setMenuNameErrorMessage('');
    setUrlErrorMessage('');
  }, [menuId]);

  useEffect(() => {
    if (
      deployTranslatedMessageResult &&
      deployTranslatedMessageResult.successOrNot === SuccessOrNot.Y &&
      deployTranslatedMessageResult.data
    ) {
      refreshLanguage();
    }
  }, [deployTranslatedMessageResult]);

  useEffect(() => {
    setMenuNameErrorMessage('');
    setUrlErrorMessage('');
  }, [menuId]);

  const menuOptions = useMemo(
    () =>
      allMenuList.map((menu) => ({
        label: menu.mnuNm,
        value: menu.mnuId,
      })),
    [allMenuList]
  );

  const selectedTargetMenuId = useMemo(() => {
    return menuOptions.filter((v) => v.value === targetMenuId)?.[0] || { label: '', value: '' };
  }, [menuOptions, menuInfoId, targetMenuId]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: '24px', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '28px',
            }}
          >
            <Typography variant="h3" sx={{ height: '28px' }}>
              {t('menu-management.label.메뉴목록', '__메뉴목록')}
            </Typography>
            <Button
              appearance="outlined"
              priority="normal"
              size="small"
              onClick={onClickAddMenu} //0703 cgr 수정
              iconComponent={<EditEdit2Icon appearance="lined" />}
              buttonLabel={t('menu-management.button.메뉴추가', '__메뉴추가')}
            />
          </Box>
          <Spacer type="h" size="4" />
          <Box sx={{ height: 'calc(100% - 140px)', overflow: 'auto' }}>
            {allMenuList && <MenuTree items={allMenuList} ref={menuTreeRef} />}
          </Box>
          <Spacer type="h" size="4" />
        </Box>
        <Box sx={{ diplay: 'flex', flexDirection: 'column', width: '70%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '28px',
            }}
          >
            <Typography variant="h3">
              {t('menu-management.label.메뉴정보', '__메뉴정보')}
            </Typography>
          </Box>
          <Spacer type="h" size="4" />

          <FormControl fullWidth>
            <DetailTableLine>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label
                    isRequired
                    labelText={t('menu-management.label.메뉴명', '__메뉴명') ?? '__메뉴명'}
                  />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        flex: '1',
                      }}
                    >
                      <InputField
                        fullWidth
                        id="menuName"
                        placeholder="메뉴명(한국어)을 입력하세요."
                        type="text"
                        textAlign="left"
                        onChange={(e) => {
                          setMenuNameErrorMessage('');
                          setMenuName(e.target.value);
                        }}
                        value={menuName}
                        sx={{ flex: 1, paddingTop: '1px' }}
                        size="medium"
                        status={menuNameErrorMessage !== '' ? 'error' : 'default'}
                      />
                      {menuNameErrorMessage !== '' && (
                        <HelperText infoText={menuNameErrorMessage} usecase="error" />
                      )}
                    </Box>
                    <Button
                      appearance="outlined"
                      buttonLabel={t('menu-management.button.다국어설정', '__다국어설정')}
                      iconComponent={<FunctionSettingIcon appearance="lined" />}
                      iconPosition="leading"
                      onClick={handleMultiLanguageButton}
                      priority="normal"
                      size="medium"
                    />
                  </Box>
                </DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label
                    labelText={t('menu-management.label.변경기준메뉴', '__변경기준메뉴') ?? ''}
                  />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <DropdownField
                    fullWidth
                    disabled={menuId === MenuEnum.root}
                    status={'default'}
                    options={menuOptions}
                    size="medium"
                    placeholder="Selected Option"
                    onChange={(e, v: any) => {
                      setTargetMenuId(v.value);
                    }}
                    value={selectedTargetMenuId}
                    isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
                  />
                </DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label labelText={t('menu-management.label.메뉴위치', '__메뉴위치') ?? ''} />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <Box alignItems="centers" display="flex" gap="12px">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={menuLocation}
                        onChange={(e) => {
                          setMenuLocation(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value="1"
                          control={
                            <Radio
                              disabled={targetMenuId === MenuEnum.root ? true : false}
                              css={st.radio}
                              size="small"
                            />
                          }
                          label={t('menu-management.label.위', '위')}
                          css={st.label}
                        />
                        <FormControlLabel
                          disabled={targetMenuId === MenuEnum.root ? true : false}
                          value="2"
                          control={<Radio css={st.radio} size="small" />}
                          label={t('menu-management.label.아래', '아래')}
                          css={st.label}
                        />
                        <FormControlLabel
                          disabled={menuId === MenuEnum.root ? true : false}
                          value="3"
                          control={<Radio css={st.radio} size="small" />}
                          label={t('menu-management.label.하위', '하위')}
                          css={st.label}
                        />
                        <FormControlLabel
                          disabled={menuId === '' ? true : false}
                          value="4"
                          control={<Radio css={st.radio} size="small" />}
                          label={t('menu-management.label.변경없음', '변경없음')}
                          css={st.label}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label labelText={t('menu-management.label.사용여부', '__사용여부') ?? ''} />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <Switch
                    color="primary"
                    onChange={(e) => {
                      setMenuUseYn(e.target.checked ? 'Y' : 'N');
                    }}
                    checked={menuUseYn === 'Y'}
                    type="basic"
                  />
                </DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label
                    labelText={t('menu-management.label.메뉴노출여부', '__메뉴노출여부') ?? ''}
                  />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <Switch
                    color="primary"
                    onChange={(e) => {
                      setMenuExposureYn(e.target.checked ? 'Y' : 'N');
                    }}
                    checked={menuExposureYn === 'Y'}
                    type="basic"
                  />
                </DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label isRequired labelText={t('menu-management.label.URL', '__URL') ?? ''} />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <InputField
                    type="text"
                    value={menuUrl}
                    onChange={(e) => {
                      setUrlErrorMessage('');
                      setMenuUrl(e.target.value);
                    }}
                    sx={{ paddingTop: '1px', width: '100%' }}
                    size="medium"
                    status={urlErrorMessage !== '' ? 'error' : 'default'}
                  />
                  {urlErrorMessage !== '' && (
                    <HelperText infoText={urlErrorMessage} usecase="error" />
                  )}
                </DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label labelText={t('menu-management.label.메뉴설명', '__메뉴설명') ?? ''} />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <InputField
                    defaultValue=""
                    fullWidth
                    limited={500}
                    onChange={(e) => {
                      setMenuDesc(e.target.value);
                    }}
                    value={menuDesc}
                    status="default"
                    textLimit
                    type="textarea"
                    placeholder={
                      t(
                        'menu-management.alert.메뉴 설명을 입력하세요.',
                        '__메뉴 설명을 입력하세요.'
                      ) ?? ''
                    }
                  />
                </DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label labelText={t('menu-management.label.메시지코드', '__메시지코드') ?? ''} />
                </DetailTableHeaderCell>
                <DetailTableDataCell>{messageCode}</DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label
                    labelText={t('menu-management.label.메뉴옵션값1', '__메뉴옵션값1') ?? ''}
                  />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <InputField
                    fullWidth
                    type="text"
                    value={menuOptionValue1}
                    onChange={(e) => {
                      setMenuOptionValue1(e.target.value);
                    }}
                    size="medium"
                  />
                </DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label
                    labelText={t('menu-management.label.메뉴옵션값2', '__메뉴옵션값2') ?? ''}
                  />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <InputField
                    fullWidth
                    type="text"
                    value={menuOptionValue2}
                    onChange={(e) => {
                      setMenuOptionValue2(e.target.value);
                    }}
                    size="medium"
                  />
                </DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label
                    labelText={t('menu-management.label.메뉴옵션값3', '__메뉴옵션값3') ?? ''}
                  />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <InputField
                    fullWidth
                    type="text"
                    value={menuOptionValue3}
                    onChange={(e) => {
                      setMenuOptionValue3(e.target.value);
                    }}
                    size="medium"
                  />
                </DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label
                    labelText={t('menu-management.label.메뉴옵션값4', '__메뉴옵션값4') ?? ''}
                  />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <InputField
                    fullWidth
                    type="text"
                    value={menuOptionValue4}
                    onChange={(e) => {
                      setMenuOptionValue4(e.target.value);
                    }}
                    size="medium"
                  />
                </DetailTableDataCell>
              </DetailTableRow>
              <DetailTableRow>
                <DetailTableHeaderCell>
                  <Label
                    labelText={t('menu-management.label.메뉴옵션값5', '__메뉴옵션값5') ?? ''}
                  />
                </DetailTableHeaderCell>
                <DetailTableDataCell>
                  <InputField
                    fullWidth
                    type="text"
                    value={menuOptionValue5}
                    onChange={(e) => {
                      setMenuOptionValue5(e.target.value);
                    }}
                    size="medium"
                  />
                </DetailTableDataCell>
              </DetailTableRow>
            </DetailTableLine>
          </FormControl>
          <Spacer type="h" size="4" />
          <ButtonGroup>
            <Button
              appearance="outlined"
              priority="normal"
              size="medium"
              buttonLabel={t('common.button.초기화', '초기화')}
              iconComponent={<ControlResetIcon size="small" />}
              onClick={refreshMenu}
            ></Button>
            <Button
              appearance="outlined"
              priority="normal"
              size="medium"
              buttonLabel={t('common.button.삭제', '__삭제')}
              iconComponent={<EditDeleteIcon appearance="lined" />}
              onClick={onDeleteMenu}
            ></Button>
            <Button
              appearance="contained"
              priority="primary"
              size="medium"
              buttonLabel={t('common.button.저장', '__저장')}
              iconComponent={<ControlConfirmIcon size="small" />}
              onClick={saveMenu}
            ></Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Spacer type="h" size="8" />
      <MessageModal />
    </Box>
    );
    */
  return <></>;
};
