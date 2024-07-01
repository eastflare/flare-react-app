import { PageDispatchContext } from 'contexts/cmn/PageContext';
import { PageOptions, PageProps } from 'models/cmn/page';
import { useContext } from 'react';
import { getUuid } from 'utils/rapUtil';

export default function useGoPage() {
  const { open } = useContext(PageDispatchContext);

  const goModal = (
    Component: any,
    props: PageProps,
    options?: PageOptions
  ) => {
    open(getUuid(), Component, props, options);
  };

  const goPage = () => {};

  const goTab = () => {};

  return {
    goModal,
    goPage,
    goTab,
  };
}
