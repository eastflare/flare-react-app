import styled from "@emotion/styled";
import { DraggableData, Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import PageModals from "./PageModals";
import { DraggableEvent } from "react-draggable";
import { PageProvider } from "contexts/cmn/PageContext";
import usePage from "hooks/cmn/usePage";
import { PopupItem } from "stores/usePageMapStore";
import { useLocation, useNavigate } from "react-router-dom";
import { history } from "utils/historyUtil";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { FontColor } from "@/ui/theme/Color";
import CloseIcon from "@mui/icons-material/Close";
import { Env } from "@/config/env";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import React from "react";

interface State {
  width: number | string;
  height: number | string;
  x: number;
  y: number;
  maxZIndex: number;
}

const StyleDialog = styled(Dialog)`
  .MuiDialog-paper {
    padding: 25px;
    box-shadow: none;
    border-radius: 0;
    color: ${FontColor.Default};
  }

  .popupTitle {
    position: relative;
    padding: 0 0 15px;
    font-size: 18px;
    font-weight: bold;
    color: ${FontColor.Primary700};
    &:before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: ${FontColor.Primary};
    }
  }

  .info {
    margin-left: 10px;
  }

  .popupContent {
    padding: 20px 0;

    .section {
      line-height: 1.4;
    }
    .searchBox {
      margin-bottom: 40px;
    }

    table {
      margin-bottom: 0;
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
    padding: 0 0 10px;
  }
`;

const Overlay = styled.div<{ topHeight?: number; leftWidth?: number; overlayZIndex?: number }>`
  position: fixed;
  top: ${props => props.topHeight || 0}px;
  left: ${props => props.leftWidth || 0}px;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: ${props => props.overlayZIndex || 999};
`;

const StyleRnd = styled.div<{ isDragging?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px;
  border: ${props => {
    if (props.isDragging) {
      return `1px solid #17191B`;
    } else {
      return "1px solid #B3B7BA";
    }
  }};
  overflow: hidden;
  ${props => (props.isDragging ? { cursor: "grabbing" } : { cursor: "default" })}
`;

const StyleRndHeader = styled.div<{ isDragging?: boolean; isMaximized?: boolean }>`
  height: 35px;
  min-height: 35px;
  background-color: ${props => {
    if (props.isDragging) {
      return "#DDE0E2";
    } else {
      return "#EBEFF0";
    }
  }};
  ${props => (props.isMaximized ? { cursor: "nor-allowed" } : props.isDragging ? { cursor: "grabbing" } : { cursor: "grab" })}&:hover {
    ${props => (props.isMaximized ? {} : { backgroundColor: "#DDE0E2" })}
  }
  &:active {
    & {
      props= > props.isMaximized? {
      }
      : {
        backgroundcolor: "#CFD2D4";
      }
    }
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

const StyleRndHeaderTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: "#2a2c2d";
`;

const StyleRndButtonGroup = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;

  button {
    padding: 4px 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #d0d0d0;
      border-radius: 3px;
    }

    &:focus {
      outline: none;
    }
  }
`;

const StyleRndBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 2px 8px 4px;
  overflow: auto;
  background: white;
  & > div {
    height: 100%;
  }
`;

const getRndStyle = ({ zIndex, isDragging }: { zIndex: number; isDragging: boolean }): React.CSSProperties => {
  return {
    zIndex: zIndex,
    transition: isDragging ? "" : "all 0.3s",
  };
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

let globalMaxZIndex = 1000;
const env = Env.getInstance();
const isMdi = env.isMdi;

const ModalContainer = ({ modalItem }: { modalItem: PopupItem }) => {
  //const Component = modalItem.element;
  //const props = modalItem.params;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const element = modalItem.element;
  const isModal = modalItem.openTypeCode === "MODAL";
  const isFixModal = modalItem.options!.isFix === true || modalItem.openTypeCode === "DIALOG";

  const [state, setState] = useState<State>({
    width: Math.min(modalItem.options?.width || 800, window.innerWidth),
    height: Math.min(modalItem.options?.height || 600, window.innerHeight),
    x: -100,
    y: 0,
    maxZIndex: 0,
  });

  const [zIndex, setZIndex] = useState(globalMaxZIndex);
  const [overlayZIndex, setOverlayZIndex] = useState(globalMaxZIndex - 1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const rndRef = useRef<Rnd>(null);
  const dialogRef = useRef(null);

  const originalSize = useRef({
    width: modalItem.options?.width ?? 800,
    height: modalItem.options?.height ?? 600,
    x: 0,
    y: 0,
  });

  const [leftMenuWidth, setLeftMenuWidth] = useState(0);
  const [topMenuHeight, setTopMenuHeight] = useState(0);
  const [pageTabBarHeight, setPageTabBarHeight] = useState(0);
  const [distanceHeight, setDistanceHeight] = useState(0);
  const [distanceWidth, setDistanceWidth] = useState(0);

  useLayoutEffect(() => {
    globalMaxZIndex += 1;
    setZIndex(globalMaxZIndex);
    setOverlayZIndex(globalMaxZIndex - 1);

    const leftMenuL = document.getElementById("leftMenu")?.offsetWidth ?? 0;
    const topMenuL = document.getElementById("topMenu")?.offsetHeight ?? 0;
    const pageTabBarL = document.getElementById("pageTabBar")?.offsetHeight ?? 0;
    const leftMenu = document.getElementById("leftMenu") ?? null;
    const pageTabBar = document.getElementById("pageTabBar") ?? null;
    const mainBody = document.getElementById("mainBody") ?? null;

    let pageTabBarBottom = 0,
      mainBodyTop = 0,
      leftMenuRight = 0,
      mainBodyLeft = 0;

    if (leftMenu) {
      leftMenuRight = leftMenu.getBoundingClientRect().right;
    }

    if (pageTabBar) {
      pageTabBarBottom = pageTabBar.getBoundingClientRect().bottom;
    }

    if (mainBody) {
      mainBodyTop = mainBody.getBoundingClientRect().top;
      mainBodyLeft = mainBody.getBoundingClientRect().left;
    }

    const distanceH = isMdi ? Math.abs(pageTabBarBottom! - mainBodyTop!) : 0;
    const distanceW = Math.abs(mainBodyLeft! - leftMenuRight!);

    setLeftMenuWidth(leftMenuL);
    setTopMenuHeight(topMenuL);
    setPageTabBarHeight(pageTabBarL);
    setDistanceHeight(distanceH);
    setDistanceWidth(distanceW);

    const width = typeof state.width === "number" ? state.width : parseInt(state.width);
    const height = typeof state.height === "number" ? state.height : parseInt(state.height);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const modalWidth = typeof width === "number" ? width : parseInt(width);
    const modalHeight = typeof height === "number" ? height : parseInt(height);

    const posX = (screenWidth - modalWidth) / 2 - (leftMenuWidth + distanceWidth);
    const posY = (screenHeight - modalHeight) / 2 - (topMenuHeight + pageTabBarHeight + distanceHeight);

    setState(prevState => ({
      ...prevState,
      x: posX,
      y: posY,
    }));
  }, [leftMenuWidth, topMenuHeight, pageTabBarHeight, distanceHeight, distanceWidth]);

  const getHighestZIndexElement = () => {
    const allRndElements = document.querySelectorAll(".myRnd, .MuiDialog-root");
    let highestZIndex = 0;
    let highestElement: Element | null = null;

    allRndElements.forEach(element => {
      const zIndex = parseInt(window.getComputedStyle(element).zIndex || "0", 10);
      if (zIndex > highestZIndex) {
        highestZIndex = zIndex;
        highestElement = element;
      }
    });

    return highestElement;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const highestElement = getHighestZIndexElement();
        const dialogElement = dialogRef.current as HTMLElement | null;

        if (highestElement && (highestElement === rndRef.current?.resizableElement.current || highestElement === dialogElement)) {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const highestElement = getHighestZIndexElement();
      const dialogElement = dialogRef.current as HTMLElement | null;

      if (highestElement && (highestElement === rndRef.current?.resizableElement.current || highestElement === dialogElement)) {
        onClose();
      }

      navigate(pathname, { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // useEffect(() => {
  //   const unListenHistoryEvent = history.listen(({ action }) => {
  //     if (action !== "POP") return;

  //     const highestElement = getHighestZIndexElement();
  //     const dialogElement = dialogRef.current as HTMLElement | null;
  //     if (highestElement && (highestElement === rndRef.current?.resizableElement.current || highestElement === dialogElement)) {
  //       onClose();
  //     }

  //     navigate(pathname, { replace: true });
  //   });

  //   return unListenHistoryEvent;
  // }, []);

  const rndManagerRef = useRef<HTMLElement | null>(null);

  const onDragStart: RndDragCallback = (_: DraggableEvent, data: DraggableData) => {
    if (data.node && !isModal) {
      rndManagerRef.current = data.node;
      if (rndManagerRef.current.style.zIndex !== globalMaxZIndex.toString()) {
        setZIndex(__ => {
          const newZIndex = globalMaxZIndex + 1;
          globalMaxZIndex = newZIndex;
          return newZIndex;
        });
        rndManagerRef.current.style.zIndex = globalMaxZIndex.toString();
      }
    }
    setIsDragging(true);
  };

  const onDragStop: RndDragCallback = (_: DraggableEvent, data: DraggableData) => {
    let { x, y } = data;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const leftMenuL = document.getElementById("leftMenu")?.offsetWidth ?? 0;
    const topMenuL = document.getElementById("topMenu")?.offsetHeight ?? 0;
    const pageTabBarL = document.getElementById("pageTabBar")?.offsetHeight ?? 0;
    const width = typeof state.width === "number" ? state.width : parseInt(state.width);

    // 화면의 좌측을 벗어나는 경우
    if (x + width < -leftMenuL) {
      x = -width;
    }

    // 화면의 우측을 벗어나는 경우
    if (x > screenWidth - leftMenuL - 10) {
      x = screenWidth + leftMenuL - width / 2;
    }

    // 화면의 상단을 벗어나는 경우
    if (y < -(topMenuL + pageTabBarL)) {
      y = -(topMenuL + pageTabBarL);
    }

    // 화면의 하단을 벗어나는 경우
    if (y > screenHeight - (topMenuL + pageTabBarL)) {
      y = screenHeight - (topMenuL + pageTabBarL) - 35;
    }

    setState(prevState => ({
      ...prevState,
      x: x,
      y: y,
    }));

    setIsDragging(false);
  };

  const onResize: RndResizeCallback = (_, __, ref, ___, position) => {
    setState(prevState => ({
      ...prevState,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position,
    }));
    setIsDragging(true);
  };

  const onResizeStop: RndResizeCallback = (_, __, ref, ___, position) => {
    setState(prevState => ({
      ...prevState,
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    }));
    setIsDragging(false);
  };

  const onClose = () => {
    if (modalItem) {
      console.log("modalItem", modalItem);
      modalItem.closeModal?.();
    }
  };

  const onMaximize = () => {
    if (isMaximized) {
      // 복구
      setState({
        ...originalSize.current,
        maxZIndex: state.maxZIndex,
      });
    } else {
      // 최대화
      originalSize.current = {
        width: typeof state.width === "number" ? state.width : parseInt(state.width),
        height: typeof state.height === "number" ? state.height : parseInt(state.height),
        x: state.x,
        y: state.y,
      };
      setState({
        width: "100%",
        height: "100%",
        x: -(leftMenuWidth + distanceWidth),
        y: -(topMenuHeight + pageTabBarHeight + distanceHeight),
        maxZIndex: state.maxZIndex,
      });
    }
    setIsMaximized(!isMaximized);
  };

  const onMinimize = () => {
    if (isMinimized) {
      // 복구
      setState({
        ...originalSize.current,
        maxZIndex: state.maxZIndex,
      });
    } else {
      // 최소화
      originalSize.current = {
        width: typeof state.width === "number" ? state.width : parseInt(state.width),
        height: typeof state.height === "number" ? state.height : parseInt(state.height),
        x: typeof state.x === "number" ? state.x : parseInt(state.x),
        y: typeof state.y === "number" ? state.y : parseInt(state.y),
      };
      setState({
        width: 200,
        height: 50,
        x: 0,
        y: window.innerHeight - 200,
        maxZIndex: state.maxZIndex,
      });
    }
    setIsMinimized(!isMinimized);
  };

  const { width, height, x, y } = state;

  const { getPageProviderProps } = usePage({ pageItem: modalItem });

  const content = isFixModal ? (
    <StyleDialog
      disableEscapeKeyDown
      TransitionComponent={Transition}
      ref={dialogRef}
      open={true}
      onClose={onClose}
      PaperProps={{
        style: {
          width: modalItem.options?.width ?? 800,
          height: modalItem.options?.height ?? 600,
          maxWidth: "100%",
          maxHeight: "100%",
          zIndex: zIndex,
        },
      }}
      sx={{
        zIndex: overlayZIndex,
        "& .MuiDialog-root": {
          zIndex: overlayZIndex,
        },
      }}
    >
      <DialogTitle className='popupTitle'>
        {modalItem?.label ?? "Dialog"}
        <IconButton className='buttonClose' onClick={onClose}>
          <CloseIcon fontSize='large'></CloseIcon>
        </IconButton>
      </DialogTitle>
      <DialogContent className='popupContent'>{modalItem.element}</DialogContent>
    </StyleDialog>
  ) : (
    <>
      {isModal && <Overlay topHeight={0} leftWidth={0} overlayZIndex={overlayZIndex} onClick={onClose} />}
      <Rnd
        className='myRnd'
        dragHandleClassName={"handle"}
        size={{ height, width }}
        position={{ x, y }}
        style={getRndStyle({ zIndex, isDragging })}
        onDragStart={onDragStart}
        onDragStop={onDragStop}
        onResize={onResize}
        onResizeStop={onResizeStop}
        minHeight={50}
        minWidth={200}
        ref={rndRef}
      >
        <StyleRnd isDragging={isDragging}>
          <StyleRndHeader isDragging={isDragging} isMaximized={isMaximized} className='handle'>
            <StyleRndHeaderTitle>{modalItem?.label ?? "Drag"}</StyleRndHeaderTitle>
            <StyleRndButtonGroup>
              <button onClick={onMinimize} onGotPointerCapture={onMinimize}>
                -
              </button>
              {!isMinimized && (
                <button onClick={onMaximize} onGotPointerCapture={onMaximize}>
                  {isMaximized ? "🗗" : "🗖"}
                </button>
              )}
              <button onClick={onClose} onGotPointerCapture={onClose}>
                ×
              </button>
            </StyleRndButtonGroup>
          </StyleRndHeader>
          <StyleRndBody>{!isMinimized && modalItem.element}</StyleRndBody>
        </StyleRnd>
      </Rnd>
    </>
  );

  return (
    <PageProvider value={{ ...getPageProviderProps() }}>
      {content}
      <PageModals />
    </PageProvider>
  );
};

export default memo(ModalContainer);
