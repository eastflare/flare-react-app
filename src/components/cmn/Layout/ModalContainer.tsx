import styled from '@emotion/styled';
import { Rnd } from 'react-rnd';
import { PageObj } from 'models/cmn/page';
import { PageDispatchContext } from 'contexts/cmn/PageContext';
import { useContext } from 'react';

interface ModalsProviderProp {
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

const ModalContainer = ({ modal }: ModalsProviderProp) => {
  const { close } = useContext(PageDispatchContext);
  const { id, Component, props, callback } = modal;
  const { onSubmit, ...restProps } = props;
  const onClose = () => {
    close(id);
  };

  const handleSubmit = async () => {
    if (typeof onSubmit === 'function') {
      await onSubmit();
    }
    onClose();
  };

  return (
    <StyleRnd default={{ x: 0, y: -300, width: 600, height: 600 }}>
      <StyleContent>
        <Component
          {...restProps}
          onClose={onClose}
          onSubmit={handleSubmit}
          callback={callback}
        />
      </StyleContent>
    </StyleRnd>
  );
};

export default ModalContainer;
