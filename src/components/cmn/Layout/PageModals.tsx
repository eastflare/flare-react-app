import { usePageContext } from "contexts/cmn/PageContext";
import ModalContainer from "./ModalContainer";

const PageModals = () => {
  const { modals } = usePageContext();
  return modals.map(modalItem => {
    return <ModalContainer key={modalItem.id} modalItem={modalItem} />;
  });
};

export default PageModals;
