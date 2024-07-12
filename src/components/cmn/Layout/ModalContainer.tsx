import styled from "@emotion/styled";
import { DraggableData, Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import { PageObj } from "models/cmn/page";
import useGoPage from "hooks/cmn/useGoPage";
import { ModalContextProvider } from "contexts/cmn/ModalContext";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PageModals from "./PageModals";
import ReactDOM from "react-dom";
import { DraggableEvent } from "react-draggable";

interface ModalsProviderProp {
  id: string;
  modal: PageObj;
}

interface State {
  width: number | string;
  height: number | string;
  x: number;
  y: number;
  maxZIndex: number;
}

const StyleRnd = styled(Rnd)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid black;
  .react-draggable {
    position: relative;
  }
  .react-resizable {
    position: relative;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999; // 모달보다는 낮지만 오버레이보다 높게 설정
`;

let globalMaxZIndex = 1000;

const ModalContainer = ({ id, modal }: ModalsProviderProp) => {
  const { closeModal } = useGoPage();
  const { Component, props } = modal;

  const [state, setState] = useState<State>({
    width: 800,
    height: 720,
    x: 0,
    y: 0,
    maxZIndex: 0,
  });

  const [zIndex, setZIndex] = useState(globalMaxZIndex);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const originalSize = useRef({ width: 800, height: 720, x: 0, y: 0 });

  useLayoutEffect(() => {
    globalMaxZIndex += 1;
    setZIndex(globalMaxZIndex);

    const width = typeof state.width === "number" ? state.width : parseInt(state.width);
    const height = typeof state.height === "number" ? state.height : parseInt(state.height);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const modalWidth = typeof width === "number" ? width : parseInt(width);
    const modalHeight = typeof height === "number" ? height : parseInt(height);
    const posX = (screenWidth - modalWidth) / 2;
    const posY = -(screenHeight - modalHeight) * 3;

    setState(prevState => ({
      ...prevState,
      x: posX,
      y: posY,
    }));
  }, []);

  useEffect(() => {
    globalMaxZIndex += 1;
    setZIndex(globalMaxZIndex);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      console.log("나는 죽습니다." + id);
    };
  }, [id]);

  const rndManagerRef = useRef<HTMLElement | null>(null);

  const onDragStart: RndDragCallback = (_: DraggableEvent, data: DraggableData) => {
    setZIndex(__ => {
      const newZIndex = globalMaxZIndex + 1;
      globalMaxZIndex = newZIndex;
      return newZIndex;
    });

    if (data.node) {
      rndManagerRef.current = data.node;
      rndManagerRef.current.style.zIndex = globalMaxZIndex.toString();
    }
  };

  const onDragStop: RndDragCallback = (_: DraggableEvent, data: DraggableData) => {
    setState(prevState => ({
      ...prevState,
      x: data.x,
      y: data.y,
    }));
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
    closeModal(id);
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
        x: 0,
        y: -970,
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
        y: -100,
        maxZIndex: state.maxZIndex,
      });
    }
    setIsMinimized(!isMinimized);
  };

  const { width, height, x, y } = state;
  const modalElement = document.getElementById("modal-root")!;
  console.log("나는x,y입니다.", x, y);
  return (
    <ModalContextProvider pageId={id}>
      {ReactDOM.createPortal(
        <>
          <Overlay onClick={onClose} />
          <StyleRnd
            dragHandleClassName={"handle"}
            size={{ height, width }}
            position={{ x, y }}
            style={{ zIndex }}
            onDragStart={onDragStart}
            onDragStop={onDragStop}
            onResize={onResize}
            onResizeStop={onResizeStop}
            enableUserSelectHack
            minHeight={50} // 최소 높이 설정
            minWidth={200} // 최소 너비 설정
            bounds='window'
          >
            <div
              className='handle'
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                backgroundColor: "gray",
                padding: "0.5rem 1rem",
                boxSizing: "border-box",
                cursor: "move",
              }}
            >
              <span>Drag</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={onMinimize}>_</button>
                {!isMinimized && <button onClick={onMaximize}>{isMaximized ? "🗗" : "🗖"}</button>}
                <button onClick={onClose}>×</button>
              </div>
            </div>
            {!isMinimized && <Component {...props} onClose={onClose} />}
          </StyleRnd>
        </>,
        modalElement
      )}
      <PageModals />
    </ModalContextProvider>
  );
};

export default ModalContainer;
