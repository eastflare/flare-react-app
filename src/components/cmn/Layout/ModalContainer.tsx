import styled from "@emotion/styled";
import { DraggableData, Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import PageModals from "./PageModals";
import { DraggableEvent } from "react-draggable";
import { PageProvider } from "contexts/cmn/PageContext";
import usePage from "hooks/cmn/usePage";
import { ModalItem } from "stores/usePageMapStore";
import { useLocation, useNavigate } from "react-router-dom";
import { history } from "utils/historyUtil";

interface State {
  width: number | string;
  height: number | string;
  x: number;
  y: number;
  maxZIndex: number;
}

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

let globalMaxZIndex = 1000;

const ModalContainer = ({ modalItem }: { modalItem: ModalItem }) => {
  //const Component = modalItem.element;
  //const props = modalItem.params;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const element = modalItem.element;
  const isModal = modalItem.openTypeCode === "MODAL";

  const [state, setState] = useState<State>({
    width: modalItem.options?.width ?? 800,
    height: modalItem.options?.height ?? 600,
    x: 0,
    y: 0,
    maxZIndex: 0,
  });

  const [zIndex, setZIndex] = useState(globalMaxZIndex);
  const [overlayZIndex, setOverlayZIndex] = useState(globalMaxZIndex - 1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const rndRef = useRef<Rnd>(null);

  const originalSize = useRef({
    width: modalItem.options?.width ?? 800,
    height: modalItem.options?.height ?? 600,
    x: 0,
    y: 0,
  });

  const [leftMenuWidth, setLeftMenuWidth] = useState(0);
  const [topMenuHeight, setTopMenuHeight] = useState(0);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [distanceHeight, setDistanceHeight] = useState(0);
  const [distanceWidth, setDistanceWidth] = useState(0);

  useLayoutEffect(() => {
    globalMaxZIndex += 1;
    setZIndex(globalMaxZIndex);
    setOverlayZIndex(globalMaxZIndex - 1);

    const leftMenuL = document.getElementById("leftMenu")?.offsetWidth ?? 0;
    const topMenuL = document.getElementById("topMenu")?.offsetHeight ?? 0;
    const topBarL = document.getElementById("topBar")?.offsetHeight ?? 0;
    const leftMenu = document.getElementById("leftMenu") ?? null;
    const topBar = document.getElementById("topBar") ?? null;
    const mainBody = document.getElementById("mainBody") ?? null;

    let topBarBottom = 0,
      mainBodyTop = 0,
      leftMenuRight = 0,
      mainBodyLeft = 0;

    if (leftMenu) {
      leftMenuRight = leftMenu.getBoundingClientRect().right;
    }

    if (topBar) {
      topBarBottom = topBar.getBoundingClientRect().bottom;
    }

    if (mainBody) {
      mainBodyTop = mainBody.getBoundingClientRect().top;
      mainBodyLeft = mainBody.getBoundingClientRect().left;
    }

    const distanceH = Math.abs(topBarBottom! - mainBodyTop!);
    const distanceW = Math.abs(mainBodyLeft! - leftMenuRight!);

    setLeftMenuWidth(leftMenuL);
    setTopMenuHeight(topMenuL);
    setTopBarHeight(topBarL);
    setDistanceHeight(distanceH);
    setDistanceWidth(distanceW);

    const width = typeof state.width === "number" ? state.width : parseInt(state.width);
    const height = typeof state.height === "number" ? state.height : parseInt(state.height);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const modalWidth = typeof width === "number" ? width : parseInt(width);
    const modalHeight = typeof height === "number" ? height : parseInt(height);

    const posX = (screenWidth - modalWidth) / 2 - (leftMenuWidth + distanceWidth);
    const posY = (screenHeight - modalHeight) / 2 - (topMenuHeight + topBarHeight + distanceHeight);

    setState(prevState => ({
      ...prevState,
      x: posX,
      y: posY,
    }));
  }, [leftMenuWidth, topMenuHeight, topBarHeight, distanceHeight, distanceWidth]);

  const getHighestZIndexElement = () => {
    const allRndElements = document.querySelectorAll(".myRnd");
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
        if (highestElement && highestElement === rndRef.current?.resizableElement.current) {
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
    const unListenHistoryEvent = history.listen(({ action }) => {
      if (action !== "POP") return;

      const highestElement = getHighestZIndexElement();
      if (highestElement && highestElement === rndRef.current?.resizableElement.current) {
        onClose();
      }

      navigate(pathname, { replace: true });
    });

    return unListenHistoryEvent;
  }, []);

  const rndManagerRef = useRef<HTMLElement | null>(null);

  const onDragStart: RndDragCallback = (_: DraggableEvent, data: DraggableData) => {
    if (data.node) {
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
    const topBarL = document.getElementById("topBar")?.offsetHeight ?? 0;
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
    if (y < -(topMenuL + topBarL)) {
      y = -(topMenuL + topBarL);
    }

    // 화면의 하단을 벗어나는 경우
    if (y > screenHeight - (topMenuL + topBarL)) {
      y = screenHeight - (topMenuL + topBarL) - 35;
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
  };

  const onResizeStop: RndResizeCallback = (_, __, ref, ___, position) => {
    setState(prevState => ({
      ...prevState,
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    }));
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
        y: -(topMenuHeight + topBarHeight + distanceHeight),
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

  return (
    <PageProvider value={{ ...getPageProviderProps() }}>
      {isModal && <Overlay topHeight={0} leftWidth={0} overlayZIndex={overlayZIndex} onClick={onClose} />}
      <Rnd
        className='myRnd'
        dragHandleClassName={"handle"}
        size={{ height, width }}
        position={{ x, y }}
        style={{ zIndex }}
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
          <StyleRndBody>
            {!isMinimized && element}
            {/* {!isMinimized && element && <div>{element}</div>} */}
          </StyleRndBody>
        </StyleRnd>
      </Rnd>
      <PageModals />
    </PageProvider>
  );
};

export default memo(ModalContainer);
