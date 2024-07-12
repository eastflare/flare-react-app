import { ModalContextInit, ModalContextType } from "models/cmn/page";
import { ReactNode, createContext, useState } from "react";

export const ModalContext = createContext<ModalContextType>(ModalContextInit);

// Context를 제공하는 상위 컴포넌트를 생성합니다.
export const ModalContextProvider = ({
  pageId,
  children,
}: {
  pageId: string;
  children: ReactNode;
}) => {
  const [childIds, setChildId] = useState<string[]>([]);

  // 값을 변경하는 함수를 정의합니다.
  const addChildId = (childId: string) => {
    setChildId(prev => [...prev, childId]);
  };

  const removeChildId = (childId: string) => {
    setChildId(prev => prev.filter(id => id !== childId));
  };

  return (
    <ModalContext.Provider value={{ pageId, childIds, addChildId, removeChildId }}>
      {children}
    </ModalContext.Provider>
  );
};
