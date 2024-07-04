import TopMenu from './TopMenu';
import LeftMenu from './LeftMenu';
import MainContent from './MainContent';
import { ReactNode } from 'react';

const GloablContainer = (props: { children: ReactNode }) => {
  return (
    <>
      <TopMenu />
      <div className='container'>
        <LeftMenu />
        <MainContent>{props.children}</MainContent>
      </div>
    </>
  );
};

export default GloablContainer;
