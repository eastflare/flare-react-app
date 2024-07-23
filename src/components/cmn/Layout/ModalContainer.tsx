import styled from "@emotion/styled";
import { DraggableData, Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import {
  ComponentClass,
  FunctionComponent,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PageModals from "./PageModals";
import { DraggableEvent } from "react-draggable";
import { PageProvider } from "contexts/cmn/PageContext";
import usePage from "hooks/cmn/usePage";
import { PageItem } from "store/pageMapStore";
import React from "react";
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

const StyleRnd = styled.div<{ isDragging?: boolean; isTop?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: ${props => {
    if (props.isDragging) {
      return `1px solid #17191B`;
    } else if (props.isTop) {
      return `1px solid #4A4E50`;
    } else {
      return "1px solid #B3B7BA";
    }
  }};
  overflow: hidden;
  ${props => (props.isDragging ? { cursor: "grabbing" } : { cursor: "default" })}
`;

const StyleRndHeader = styled.div<{ isDragging?: boolean; isMaximized?: boolean; isTop?: boolean }>`
  height: 35px;
  min-height: 35px;
  background-color: ${props => {
    if (props.isDragging) {
      return "#DDE0E2";
    } else if (props.isTop) {
      return "#CFD2D4";
    } else {
      return "#EBEFF0";
    }
  }};
  ${props =>
    props.isMaximized
      ? { cursor: "nor-allowed" }
      : props.isDragging
        ? { cursor: "grabbing" }
        : { cursor: "grab" }}&:hover {
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
  border-radius: 4px 4px 0 0;
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
  border-radius: 0 0 4px 4px;
  background: white;
  & > div {
    height: 100%;
  }
`;

let globalMaxZIndex = 1000;

const ModalContainer = ({ pageItem }: { pageItem: PageItem }) => {
  //const Component = pageItem.element;
  //const props = pageItem.params;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const element = pageItem.element as unknown as FunctionComponent | ComponentClass;
  //어차피 뒤로가기가 가능함으로 overlay를 메뉴는 제외하라는 워니님의 의견 반영은 보류겐
  const topHeight = 99; //임시로 지정함
  const leftWidth = 150; //임시로 지정함
  const isModal = pageItem.openTypeCode === "MODAL";

  const [state, setState] = useState<State>({
    width: pageItem.options?.width ?? 800,
    height: pageItem.options?.height ?? 600,
    x: 0,
    y: 0,
    maxZIndex: 0,
  });

  const [zIndex, setZIndex] = useState(globalMaxZIndex);
  const [overlayZIndex, setOverlayZIndex] = useState(globalMaxZIndex - 1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const originalSize = useRef({
    width: pageItem.options?.width ?? 800,
    height: pageItem.options?.height ?? 600,
    x: 0,
    y: 0,
  });

  useLayoutEffect(() => {
    globalMaxZIndex += 1;
    setZIndex(globalMaxZIndex);
    setOverlayZIndex(globalMaxZIndex - 1);

    const width = typeof state.width === "number" ? state.width : parseInt(state.width);
    const height = typeof state.height === "number" ? state.height : parseInt(state.height);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const modalWidth = typeof width === "number" ? width : parseInt(width);
    const modalHeight = typeof height === "number" ? height : parseInt(height);
    const posX = (screenWidth - modalWidth) / 2;
    const posY = (screenHeight - modalHeight) / 2;

    setState(prevState => ({
      ...prevState,
      x: posX,
      y: posY,
    }));
  }, []);

  useEffect(() => {
    globalMaxZIndex += 1;
    setZIndex(globalMaxZIndex);
    setOverlayZIndex(globalMaxZIndex - 1);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const unListenHistoryEvent = history.listen(({ action }) => {
      if (action !== "POP") return;
      onClose();
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
    setState(prevState => ({
      ...prevState,
      x: data.x,
      y: data.y,
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
    if (pageItem) {
      pageItem.closeModal?.();
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
        x: state.x, // Assuming x and y are always numbers
        y: state.y,
      };
      setState({
        width: "100%",
        height: "100%",
        x: -leftWidth,
        y: -topHeight,
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

  // const bringToFront = () => {
  //   if (rndManagerRef.current) {
  //     const data = {
  //       node: rndManagerRef.current,
  //       x: state.x,
  //       y: state.y,
  //     } as DraggableData;
  //     onDragStart({} as DraggableEvent, data);
  //   }
  // };

  const { width, height, x, y } = state;
  console.log("나는x,y입니다.", x, y);

  const { getPageProviderProps } = usePage({ pageItem });

  return (
    <PageProvider value={{ ...getPageProviderProps() }}>
      {isModal && (
        <Overlay topHeight={0} leftWidth={0} overlayZIndex={overlayZIndex} onClick={onClose} />
      )}
      <Rnd
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
        bounds='window'
      >
        <StyleRnd
          isTop={rndManagerRef?.current?.style.zIndex === globalMaxZIndex.toString()}
          isDragging={isDragging}
        >
          <StyleRndHeader
            isDragging={isDragging}
            isMaximized={isMaximized}
            isTop={rndManagerRef?.current?.style.zIndex === globalMaxZIndex.toString()}
            className='handle'
          >
            <StyleRndHeaderTitle>{pageItem?.label ?? "Drag"}</StyleRndHeaderTitle>
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
            {/* {!isMinimized && <element {...props} onClose={onClose} />} */}
            {!isMinimized && element && <div>{React.createElement(element)}</div>}
          </StyleRndBody>
        </StyleRnd>
      </Rnd>
      <PageModals />
    </PageProvider>
  );
};

export default memo(ModalContainer);
