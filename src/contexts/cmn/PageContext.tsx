import {
  PageCallback,
  PageComponent,
  PageId,
  PageOptions,
  PageProps,
} from 'models/cmn/page';
import { createContext } from 'react';

interface PageContextType {
  open: (
    id: PageId,
    Component: PageComponent,
    props: PageProps,
    callback?: PageCallback,
    options?: PageOptions
  ) => void;
  close: (id: string) => void;
}

export const PageDispatchContext = createContext<PageContextType>({
  open: () => {},
  close: () => {},
});

export const PageStateContext = createContext<any>([]);
