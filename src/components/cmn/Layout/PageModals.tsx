import { usePageContext } from "contexts/cmn/PageContext";
import ModalContainer from "./ModalContainer";

const PageModals = () => {
  const { modals } = usePageContext();
  return modals.map(pageItem => {
    return <ModalContainer key={pageItem.id} pageItem={pageItem} />;
  });
};

export default PageModals;
