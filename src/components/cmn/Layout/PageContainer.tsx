import { PageObj } from 'models/cmn/page';
import useGoPage from 'hooks/cmn/useGoPage';
import { ModalContextProvider } from 'contexts/cmn/ModalContext';
import { useEffect } from 'react';
import PageModals from './PageModals';

interface ModalsProviderProp {
  id: string;
  modal: PageObj;
}

const PageContainer = ({ id, modal }: ModalsProviderProp) => {
  const { closeModal } = useGoPage();
  const { Component, props } = modal;

  useEffect(() => {
    return () => {
      console.log('나는 페이지 죽습니다.' + id);
    };
  }, []);

  const onClose = () => {
    closeModal(id);
  };

  return (
    <ModalContextProvider pageId={id}>
      <Component {...props} onClose={onClose} />
      <PageModals />
    </ModalContextProvider>
  );
};

export default PageContainer;
