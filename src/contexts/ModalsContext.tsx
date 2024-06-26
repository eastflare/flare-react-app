import { ReactNode, createContext } from 'react';

interface ModalsContextType{
    open : (Component:ReactNode, props:any) => void;
    close: (Component:ReactNode) => void;
}

export const ModalsDispatchContext = createContext<ModalsContextType>({
    open: () => {},
    close: () => {},
});

export const ModalsStateContext = createContext<any>([]);