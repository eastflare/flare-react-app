import loadable from '@loadable/component';
import { useContext } from 'react';
import { ModalsStateContext, ModalsDispatchContext } from 'contexts/ModalsContext';
import ModalContainer from './ModalContainer';

export const modals = {
    myModal: loadable(() => import('pages/smpl/poup/MyModal')),
    myModal1: loadable(() => import('pages/smpl/poup/MyModal1')),
    myModal2: loadable(() => import('pages/smpl/poup/MyModal2')),
    myModal3: loadable(() => import('pages/smpl/poup/MyModal3')),
};

const Modals = () => {

  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);

  return openedModals.map((modal:any) => {

    const { id, Component, props } = modal;
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
      <ModalContainer key={id}>
        <Component
          key={id}
          {...restProps}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      </ModalContainer>
      );
  });
};

export default Modals;