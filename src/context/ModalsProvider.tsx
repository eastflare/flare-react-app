import { ReactNode, useState, useMemo } from 'react';
import { ModalsDispatchContext, ModalsStateContext } from './ModalsContext';

interface ModalsProviderProp {
    children : ReactNode;
}

interface ModalArr {
    Component : ReactNode;
    props : (any)[];
}

const ModalsProvider = ({ children } : ModalsProviderProp) => {

    const [openedModals, setOpenedModals] = useState<ModalArr[]>([]);

    const open = (Component:any, props:any) => {
        setOpenedModals((modals) => {
            return [...modals, { Component, props }];
        });
    }

    const close = (Component:any) => {
        setOpenedModals((modals) => {
            return modals.filter((modal) => {
                return modal.Component !== Component;
            });
        });
    };

    const dispatch = useMemo(() => ({ open, close }), []);

    return (
        <ModalsStateContext.Provider value={openedModals}>
            <ModalsDispatchContext.Provider value={dispatch}>
                {children}
            </ModalsDispatchContext.Provider>
        </ModalsStateContext.Provider>
    )
}

export default ModalsProvider;