import styled from '@emotion/styled';
import { Rnd } from 'react-rnd';
import { PageObj } from 'models/cmn/page';
import useGoPage from 'hooks/cmn/useGoPage';
import { PageContext, PageStateContext } from 'contexts/cmn/PageContext';

interface ModalsProviderProp {
  id: string;
  modal: PageObj;
}

const StyleRnd = styled(Rnd)`
  display: flex;
  align-items: center;
  justify-content: center;
  .react-draggable {
    position: relative;
  }
  .react-resizable {
    position: relative;
  }
`;

const StyleContent = styled.div`
  background: white;
  border: 1px solid black;
`;

const ModalContainer = ({ id, modal }: ModalsProviderProp) => {
  //const { close } = useContext(PageDispatchContext);
  const { closeModal } = useGoPage();
  console.log('modal--->', modal);
  const { Component, props } = modal;

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
    <PageContext.Provider value={id}>
      <StyleRnd default={{ x: 0, y: -300, width: 600, height: 600 }}>
        <StyleContent>
          <Component {...props} onClose={onClose} />
        </StyleContent>
      </StyleRnd>
    </PageContext.Provider>
  );
};

export default ModalContainer;
