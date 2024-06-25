import loadable from '@loadable/component';
import { useContext } from 'react';
import { ModalsStateContext, ModalsDispatchContext } from '../context/ModalsContext';

export const modals = {
    myModal: loadable(() => import('./MyModal')),
    myModal1: loadable(() => import('./MyModal1')),
    myModal2: loadable(() => import('./MyModal2')),
    myModal3: loadable(() => import('./MyModal3')),
};

const Modals = () => {

  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);

  return openedModals.map((modal:any, index:number) => {

    const { Component, props } = modal;
    const { onSubmit, ...restProps } = props;
    const onClose = () => {
      close(Component);
    };

    const handleSubmit = async () => {
        if (typeof onSubmit === 'function') {
            await onSubmit();
        }
        onClose();
    };

    return (
        <Component
          {...restProps}
          key={index}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      );

  });
};

export default Modals;