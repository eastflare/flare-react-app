import { ReactNode } from "react";
import styled from '@emotion/styled'
import {Rnd} from 'react-rnd'

interface ModalsProviderProp {
    children : ReactNode;
}

const StyleRnd = styled(Rnd)`
    display:flex;
    align-items:center;
    justify-content:center;
    .react-draggable{
      position:relative;
    }
    .react-resizable{
      position:relative;
    }
    `;

const StyleContent = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    background:gray;
    padding:20px;
    border-radius:8px;
    `;

const ModalContainer = ({ children } : ModalsProviderProp) => {
    
    return (
        <StyleRnd default={{x:0,y:0,width:600,height:600}}>
            <StyleContent>
                {children}
            </StyleContent>
        </StyleRnd>
    );
};

export default ModalContainer;