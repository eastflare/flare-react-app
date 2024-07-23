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
};

export default Modals;
