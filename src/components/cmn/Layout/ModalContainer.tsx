import styled from '@emotion/styled';
import { Rnd } from 'react-rnd';
import { PageObj } from 'models/cmn/page';
import useGoPage from 'hooks/cmn/useGoPage';
import { PageContextProvider } from 'contexts/cmn/PageContext';
import { useEffect } from 'react';
import { usePageStore } from 'store/pageStore';
import PageModals from './PageModals';

interface ModalsProviderProp {
  id: string;
  modal: PageObj;
}

const StyleRnd = styled(Rnd)`
  display: flex;
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

const ModalContainer = ({ id, modal }: ModalsProviderProp) => {
  //const { close } = useContext(PageDispatchContext);
  const { closeModal } = useGoPage();
  const { removePage } = usePageStore();

  console.log('modal--->', modal);
  const { Component, props } = modal;

  useEffect(() => {
    return () => {
      //removePage(id);
      console.log('나는 죽습니다.' + id);
    };
  }, []);

  //const { onSubmit, ...restProps } = props;
  const onClose = () => {
    closeModal(id);
  };

  // const handleSubmit = async () => {
  //   if (typeof onSubmit === 'function') {
  //     await onSubmit();
  //   }
  //   onClose();
  // };

  return (
    <PageContextProvider pageId={id}>
      <StyleRnd default={{ x: 0, y: -300, width: 600, height: 600 }}>
        <Component {...props} onClose={onClose} />
      </StyleRnd>
      <PageModals />
    </PageContextProvider>
  );
};

export default ModalContainer;
