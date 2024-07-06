import { ReactNode } from "react";
import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";

const MainLayout = ({ children }: { children: ReactNode }) => {
  //메인 화면의 레이아웃 구성
  //상단메뉴, 좌측메뉴, 화면영역은 children : Routes 객체임

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

export default MainLayout;
