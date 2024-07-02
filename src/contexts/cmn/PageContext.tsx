import { PageContextInit, PageContextType } from 'models/cmn/page';
import { ReactNode, createContext, useState } from 'react';

export const PageContext = createContext<PageContextType>(PageContextInit);

// Context를 제공하는 상위 컴포넌트를 생성합니다.
export const PageContextProvider = ({
  pageId,
  children,
}: {
  pageId: string;
  children: ReactNode;
}) => {
  const [childIds, setChildId] = useState<string[]>([]);

  // 값을 변경하는 함수를 정의합니다.
  const addChildId = (childId: string) => {
    // setChildId([...childIds, childId]);
    console.log('addChildId');
    setChildId((prev) => [...prev, childId]);
  };

  const removeChildId = (childId: string) => {
    setChildId((prev) => prev.filter((id) => id !== childId));
  };

  return (
    <PageContext.Provider
      value={{ pageId, childIds, addChildId, removeChildId }}
    >
      {children}
    </PageContext.Provider>
  );
};
