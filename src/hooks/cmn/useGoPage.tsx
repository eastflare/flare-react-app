import { PageDispatchContext } from 'contexts/cmn/PageContext';
import { PageCallback, PageOptions, PageProps } from 'models/cmn/page';
import { useContext } from 'react';
import { getUuid } from 'utils/rapUtil';

export default function useGoPage() {
  const { open } = useContext(PageDispatchContext);

  const goModal = (
    Component: any,
    props: PageProps,
    callback?: PageCallback,
    options?: PageOptions
  ) => {
    open(getUuid(), Component, props, callback, options);
  };

  const goPage = () => {};

  const goTab = () => {};

  return {
    goModal,
    goPage,
    goTab,
  };
}
