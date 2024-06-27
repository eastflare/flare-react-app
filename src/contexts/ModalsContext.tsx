import { ReactNode, createContext } from 'react';

interface ModalsContextType{
    open : (id:string, Component:ReactNode, props:any) => void;
    close: (id:string) => void;
}

export const ModalsDispatchContext = createContext<ModalsContextType>({
    open: () => {},
    close: () => {},
});

export const ModalsStateContext = createContext<any>([]);