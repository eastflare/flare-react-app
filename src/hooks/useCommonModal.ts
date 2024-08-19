import { useCallback, useState } from "react";

import { CommonModalAnimateClassName, CommonModalInitialState, CommonModalState } from "@/models/common/CommonModal";
import { useCommonModalStore } from "stores/useCommonModalStore";

export const useCommonModal = () => {
  const [animation, setAnimation] = useState<CommonModalAnimateClassName>(CommonModalAnimateClassName.OPEN);

  const { modalType, isOpen, title, content, showCallbackResult, yesCallback, noCallback, setCommonModalStateWhenModalOpen, setCommonModalStateWhenModalClose } = useCommonModalStore();

  const closeCommonModal = useCallback(() => {
    setAnimation(CommonModalAnimateClassName.CLOSE);
    setTimeout(() => {
      setCommonModalStateWhenModalClose();
      setAnimation(CommonModalAnimateClassName.OPEN);
    }, 180);
  }, [setCommonModalStateWhenModalClose]);

  /**
   * @param modalType [default: alert] confirm: OK, Cancel 두가지 버튼, alert: OK 한가지 버튼
   * @param showCallbackResult [default: false] callback 함수의 응답을 다시 alert 모달로 보여줄 지 말지 결정
   * @param title modal 창의 제목
   * @param content modal 창의 내용
   * @param yesCallback modal 창의 OK 버튼의 callback 함수
   * @param noCallback modal 창의 Cancel 버튼의 callback 함수
   */
  const openCommonModal = useCallback(
    ({ modalType = "alert", showCallbackResult = false, ...rest }: CommonModalInitialState) => {
      setCommonModalStateWhenModalOpen({
        ...rest,
        modalType: modalType,
        showCallbackResult: showCallbackResult,
      });
    },
    [setCommonModalStateWhenModalOpen]
  );

  return {
    commonModalState: {
      modalType: modalType,
      animation: animation,
      isOpen: isOpen,
      title: title,
      content: content,
      showCallbackResult: showCallbackResult,
      yesCallback: yesCallback,
      noCallback: noCallback,
    } as CommonModalState,
    closeCommonModal,
    openCommonModal,
  };
};
