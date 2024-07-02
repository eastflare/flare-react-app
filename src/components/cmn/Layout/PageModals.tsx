import ModalContainer from './ModalContainer';
import { useContext } from 'react';
import { PageContext } from 'contexts/cmn/PageContext';
import { usePageStore } from 'store/pageStore';

const PageModals = () => {
  const { pages } = usePageStore();
  const { childIds } = useContext(PageContext);
  console.log('나는 childIds입니다!', childIds);
  return childIds.map((modalId: string) => {
    console.log('자식 팝업', modalId);
    return <ModalContainer key={modalId} id={modalId} modal={pages[modalId]} />;
  });
};

export default PageModals;
