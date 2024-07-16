import loadable from "@loadable/component";

export const modals = {
  myModal: loadable(() => import("pages/smpl/poup/MyModal")),
  myModal1: loadable(() => import("pages/smpl/poup/MyModal1")),
  myModal2: loadable(() => import("pages/smpl/poup/MyModal2")),
  myModal3: loadable(() => import("pages/smpl/poup/MyModal3")),
  matthew: loadable(() => import("pages/smpl/poup/Matthew")),
};

const Modals = () => {
  return <></>;
  // const { pages, modals } = useGoPage();
  // console.log("나는 모달즈입니다.", modals);
  // return modals.map((modalId: string) => {
  //   return <ModalContainer key={modalId} id={modalId} modal={pages[modalId]} />;
  // });
};

export default Modals;
