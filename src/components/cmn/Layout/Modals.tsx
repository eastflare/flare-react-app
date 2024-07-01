import loadable from '@loadable/component';
import { useContext } from 'react';
import { PageStateContext } from 'contexts/cmn/PageContext';
import ModalContainer from './ModalContainer';
import { PageObj } from 'models/cmn/page';

export const modals = {
  myModal: loadable(() => import('pages/smpl/poup/MyModal')),
  myModal1: loadable(() => import('pages/smpl/poup/MyModal1')),
  myModal2: loadable(() => import('pages/smpl/poup/MyModal2')),
  myModal3: loadable(() => import('pages/smpl/poup/MyModal3')),
  matthew: loadable(() => import('pages/smpl/poup/Matthew')),
};

const Modals = () => {
  const arrModals = useContext(PageStateContext);

  return arrModals.map((modal: PageObj) => {
    return <ModalContainer key={modal.id} modal={modal} />;
  });
};

export default Modals;
