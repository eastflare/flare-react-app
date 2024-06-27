import { ReactNode, createContext } from 'react';

interface ModalsContextType{
    open : (uuid:string, Component:ReactNode, props:any) => void;
    close: (uuid:string) => void;
}

export const ModalsDispatchContext = createContext<ModalsContextType>({
    open: () => {},
    close: () => {},
});

export const ModalsStateContext = createContext<any>([]);