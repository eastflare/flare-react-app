import { useState } from "react";

const usePage = () => {
  const [aaa, setAaa] = useState(1);

  const getPageProviderProps = () => ({
    aaa,
    setAaa,
  });

  return {
    getPageProviderProps,
  };
};

export default usePage;

//PageContext 에서 사용하기 위한 Type을 ReturnType의 함수를 통해 정의함.
export type TPageProviderProps = ReturnType<ReturnType<typeof usePage>["getPageProviderProps"]>;
