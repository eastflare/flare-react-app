import loadable from '@loadable/component';
import ModalContainer from './ModalContainer';
import useGoPage from 'hooks/cmn/useGoPage';

export const modals = {
  myModal: loadable(() => import('pages/smpl/poup/MyModal')),
  myModal1: loadable(() => import('pages/smpl/poup/MyModal1')),
  myModal2: loadable(() => import('pages/smpl/poup/MyModal2')),
  myModal3: loadable(() => import('pages/smpl/poup/MyModal3')),
  matthew: loadable(() => import('pages/smpl/poup/Matthew')),
};

const Modals = () => {
  const { pages, modals } = useGoPage();

  return modals.map((modalId: string) => {
    return <ModalContainer key={modalId} id={modalId} modal={pages[modalId]} />;
  });
};

export default Modals;
