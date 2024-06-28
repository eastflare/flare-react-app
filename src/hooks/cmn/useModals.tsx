import { useContext } from "react";
import { ModalsDispatchContext } from "contexts/cmn/ModalsContext";
import { getUuid } from "utils/rapUtil";

export default function useModals() {
    const { open } = useContext(ModalsDispatchContext);

    const openModal = (Component: any, props: any) => {
        open(getUuid(), Component, props);
    };

    return {
        openModal,
    };
}
