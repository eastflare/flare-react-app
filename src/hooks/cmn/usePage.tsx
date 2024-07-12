import { PageItem } from "store/pageMapStore";

const usePage = (props: { pageItem: PageItem }) => {
  const { params = {}, options = {}, callback = () => {} } = props.pageItem;

  const getPageProviderProps = () => ({
    params,
    options,
    callback,
  });

  return {
    getPageProviderProps,
  };
};

export default usePage;

//PageContext 에서 사용하기 위한 Type을 ReturnType의 함수를 통해 정의함.
export type TPageProviderProps = ReturnType<ReturnType<typeof usePage>["getPageProviderProps"]>;
