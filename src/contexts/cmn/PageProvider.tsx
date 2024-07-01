import { ReactNode, useState, useMemo } from 'react';
import { PageDispatchContext, PageStateContext } from './PageContext';
import {
  PageComponent,
  PageId,
  PageObj,
  PageOptions,
  PageProps,
} from 'models/cmn/page';

const PageProvider = ({ children }: {
  children: ReactNode;
}) => {

  const [openedModals, setOpenedModals] = useState<PageObj[]>([]);
  
  const open = (
    id: PageId,
    Component: PageComponent,
    props: PageProps,
    options?: PageOptions
  ) => {
    setOpenedModals((modals) => {
      return [...modals, { id, Component, props, options }];
    });
  };

  const close = (id: string) => {
    setOpenedModals((modals) => {
      // 배열을 순회하면서 일치하는 객체의 인덱스를 찾음
      return modals.filter((modal) => {
        return modal.id !== id;
      });
    });
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <PageStateContext.Provider value={openedModals}>
      <PageDispatchContext.Provider value={dispatch}>
        {children}
      </PageDispatchContext.Provider>
    </PageStateContext.Provider>
  );
};

export default PageProvider;
