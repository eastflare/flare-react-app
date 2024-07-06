import { ReactNode } from "react";
import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";

const UniversalContainer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TopMenu />
      <div className='container'>
        <LeftMenu />
        {children}
      </div>
    </>
  );
};

export default UniversalContainer;
