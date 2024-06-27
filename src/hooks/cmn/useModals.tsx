import {useContext} from 'react';
import {ModalsDispatchContext} from 'contexts/ModalsContext';
import {v4 as uuid} from 'uuid';

export default function useModals() {

    const { open } = useContext(ModalsDispatchContext);
  
    const openModal = (Component:any, props:any) => {
        open(uuid(), Component, props);
    };

    return {
        openModal,
    };
}
  