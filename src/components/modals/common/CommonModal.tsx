/** @jsxImportSource @emotion/react */
import { useCallback, useEffect } from "react";
import styled from "@emotion/styled";

import "components/modals/common/CommonModal.css";
import { Undefinedable } from "models/common/FalsyGeneric";
import { useCommonModal } from "hooks/useCommonModal";
import { useTranslation } from "react-i18next";
import { FontColor } from "ui/theme/Color";
import CloseIcon from "@mui/icons-material/Close";
import { css } from "@emotion/react";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button } from "@mui/material";

export const UnfilledButton = styled(Button)`
  padding: 10px;
  height: 36px;
  min-width: 56px;
  margin: 0 3px;
  color: #666;
  font-size: 13px;
  line-height: 15px;
  border: 0;
  border-radius: 3px;

  &:hover {
    background-color: #f1f4f3;
  }

  &:active,
  &:focus {
    color: #1f1f1f;
    background-color: #dde0df;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const UnfilledPriButton = styled(Button)`
  padding: 10px;
  height: 36px;
  min-width: 56px;
  margin: 0 3px;
  font-size: 13px;
  line-height: 15px;
  border: 0;
  border-radius: 3px;

  &:hover {
    background-color: #ecfcf8;
  }

  &:active,
  &:focus {
    color: #0b3e63;
    background-color: #d9fcf4;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const di = {
  dialog: css`
    .MuiDialog-paper {
      min-width: 400px;
      padding: 25px;
      box-sizing: content-box;
      box-shadow: none;
      border-radius: 0;
      color: ${FontColor.Default};
      word-break: keep-all;
    }

    .popupTitle {
      position: relative;
      padding: 0;
      font-size: 18px;
      font-weight: bold;
      color: ${FontColor.Primary700};
      &:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${FontColor.Primary};
      }
    }
    .popupContent {
      padding: 20px 0;
      font-size: 13px;
      line-height: 19px;

      .searchBox {
        margin-bottom: 40px;
      }
    }

    .MuiDialogTitle-root + .MuiDialogContent-root {
      padding-top: 20px;
    }

    .buttonClose {
      position: absolute;
      top: 5px;
      right: 0;
      width: 22px;
      height: 22px;
      min-width: 20px;
      svg {
        fill: ${FontColor.Gray400};
        font-size: 1.5rem;
      }
    }

    .buttonsTop {
      text-align: right;
      & + .section {
        margin-top: 20px;
      }
    }

    .popupBottom {
      padding: 0;
    }
  `,
};

export const CommonModal = () => {
  const { t } = useTranslation();
  const {
    commonModalState: {
      modalType,
      // animation,
      isOpen,
      title,
      content,
      yesCallback,
      noCallback,
      showCallbackResult,
    },
    openCommonModal,
    closeCommonModal,
  } = useCommonModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.top = "-${window.pageYOffset}px";
      // common modal 발생 시 최상단으로 스크롤 업됨 우선 주석처리.
      // document.body.style.position = 'fixed';
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    }
    return () => {
      // const heightScroll = parseInt(document.body.style.top || '0', 10) * -1;
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("width");
      document.body.style.removeProperty("top");
      // common modal 닫을 시 최상단으로 스크롤 업됨 우선 주석처리.
      // window.scrollTo(0, heightScroll);
    };
  }, [isOpen]);

  const handleCallbackResult = useCallback(
    async (callback: Undefinedable<() => any>, showCallbackResult = false) => {
      setTimeout(async () => {
        if (callback) {
          const callbackResult = await callback();
          if (showCallbackResult) {
            openCommonModal({
              content: callbackResult,
            });
          }
        }
      }, 300);
    },
    [openCommonModal]
  );

  const handleNoButtonClick = useCallback(async () => {
    closeCommonModal();
    await handleCallbackResult(noCallback, showCallbackResult);
  }, [closeCommonModal, noCallback, showCallbackResult, handleCallbackResult]);

  const handleYesButtonClick = useCallback(async () => {
    closeCommonModal();
    await handleCallbackResult(yesCallback, showCallbackResult);
  }, [closeCommonModal, yesCallback, showCallbackResult, handleCallbackResult]);

  return (
    <>
      {isOpen && t && (
        <Dialog open={isOpen} onClose={handleNoButtonClick} css={di.dialog}>
          <DialogTitle className='popupTitle'>
            {title === "" ? (modalType === "alert" ? t("common.title.알림", "__알림") : t("common.title.확인", "__확인")) : title}
            <IconButton className='buttonClose' onClick={handleNoButtonClick}>
              <CloseIcon fontSize='large'></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent className='popupContent'>
            <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
          </DialogContent>
          <DialogActions className='popupBottom'>
            {modalType === "confirm" && <UnfilledButton onClick={handleNoButtonClick}>{t("common.button.취소", "__취소")}</UnfilledButton>}
            {modalType !== "yesno" && (
              <UnfilledPriButton onClick={handleYesButtonClick} className='txtBlue'>
                {t("common.button.확인", "__확인")}
              </UnfilledPriButton>
            )}
            {modalType === "yesno" && (
              <>
                <UnfilledButton onClick={handleYesButtonClick} className='txtBlue'>
                  {t("common.button.예", "__예")}
                </UnfilledButton>
                <UnfilledPriButton onClick={handleNoButtonClick}>{t("common.button.아니오", "__아니오")}</UnfilledPriButton>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
