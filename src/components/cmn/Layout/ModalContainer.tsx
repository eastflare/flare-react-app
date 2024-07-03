import styled from '@emotion/styled';
import { Rnd } from 'react-rnd';
import { PageObj } from 'models/cmn/page';
import useGoPage from 'hooks/cmn/useGoPage';
import { PageContextProvider } from 'contexts/cmn/PageContext';
import { useEffect } from 'react';
import PageModals from './PageModals';
import ReactDOM from 'react-dom';

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
  const { closeModal } = useGoPage();
  const { Component, props } = modal;

  useEffect(() => {
    return () => {
      console.log('나는 죽습니다.' + id);
    };
  }, []);

  const onClose = () => {
    closeModal(id);
  };

  const modalElement = document.getElementById('modal')!;

  return (
    <PageContextProvider pageId={id}>
      {ReactDOM.createPortal(
        <StyleRnd
          dragHandleClassName={'handle'}
          default={{ x: -600, y: -300, width: 600, height: 600 }}
        >
          <div
            className='handle'
            style={{
              backgroundColor: 'gray',
              padding: '1rem',
            }}
          >
            Drag
          </div>
          <Component {...props} onClose={onClose} />
        </StyleRnd>,
        modalElement
      )}
      <PageModals />
    </PageContextProvider>
  );
};

export default ModalContainer;
