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
            /*
            return modals.filter((modal) => {
                return modal.Component !== Component;
            });
            */
            let lastIndex = -1;

            // // 배열을 순회하면서 일치하는 객체의 인덱스를 찾음
            modals.forEach((modal, index) => {
                if (modal.Component === Component) {
                    lastIndex = index; // 일치하는 객체의 인덱스 저장
                }
            });

            // //마지막 모달 삭제
            lastIndex > -1 && modals.splice(lastIndex, 1);
            console.log(modals);
            return modals;
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