import { usePageContext } from "contexts/PageContext";
import ModalContainer from "./ModalContainer";

const PageModals = () => {
  const { modals } = usePageContext();
  return modals.map(modalItem => {
    console.log("modalItem", modalItem);
    return <ModalContainer key={modalItem.id} modalItem={modalItem} />;
  });
};

export default PageModals;
