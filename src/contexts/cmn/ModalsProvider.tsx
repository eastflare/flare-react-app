import { ReactNode, useState, useMemo } from 'react';
import { ModalsDispatchContext, ModalsStateContext } from './ModalsContext';

interface ModalsProviderProp {
    children : ReactNode;
}

interface ModalArr {
    id : string;
    Component : ReactNode;
    props : (any)[];
}

const ModalsProvider = ({ children } : ModalsProviderProp) => {

    const [openedModals, setOpenedModals] = useState<ModalArr[]>([]);

    const open = (id:string, Component:ReactNode, props:any) => {
        setOpenedModals((modals) => {
            return [...modals, {id, Component, props }];
        });
    }

    const close = (id:string) => {

        setOpenedModals((modals) => {
            // 배열을 순회하면서 일치하는 객체의 인덱스를 찾음
            return modals.filter((modal) => {
                return modal.id !== id;
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